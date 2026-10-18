import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import dotenv from "dotenv";
import path from "node:path";
import { createServer as createViteServer } from "vite";
import { answerPortfolio } from "./src/rag/answer";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

type ChatMessage = { role: "user" | "assistant" | "model"; content: string };

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const m = value as Record<string, unknown>;
  return (
    typeof m.role === "string" &&
    ["user", "assistant", "model"].includes(m.role) &&
    typeof m.content === "string" &&
    m.content.length <= 4000
  );
}

app.get("/api/health", (_req: Request, res: Response) =>
  res.json({ status: "ok", mode: "local-intent-answer" }),
);

app.post("/api/portfolio-chat", (req: Request, res: Response) => {
  const messages: unknown = req.body?.messages;

  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 50)
    return res.status(400).json({ error: "Messages must contain 1–50 items." });

  if (!messages.every(isChatMessage))
    return res.status(400).json({ error: "Invalid message format." });

  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last?.content.trim())
    return res.status(400).json({ error: "A user message is required." });

  const lang = req.body?.lang === "id" ? "id" : "en";

  return res.json({ text: answerPortfolio(last.content.trim(), lang) });
});

app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
  const type = (error as { type?: string } | null)?.type;
  if (type === "entity.parse.failed")
    return res.status(400).json({ error: "Invalid JSON request body." });
  if (type === "entity.too.large")
    return res.status(413).json({ error: "Request body is too large." });
  return next(error);
});

async function startServer(): Promise<void> {
  if (!IS_PRODUCTION) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get(/.*/, (_req: Request, res: Response) =>
      res.sendFile(path.join(distPath, "index.html")),
    );
  }

  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running at http://localhost:${PORT}`),
  );
}

startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
