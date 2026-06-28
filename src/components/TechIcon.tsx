import React from "react";
import {
  Code,
  Database,
  Server,
  Zap,
  Cloud,
  Sparkles,
  Cpu,
  Container,
  CloudLightning,
  Send,
  FileCode,
} from "lucide-react";

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = "w-6 h-6",
}) => {
  switch (name) {
    case "CodeReact":
    case "TypeScript":
    case "TanStack":
    case "Svelte":
      return <Code className={className} id={`icon-${name.toLowerCase()}`} />;
    case "Tailwind":
    case "Sparkles":
      return (
        <Sparkles className={className} id={`icon-${name.toLowerCase()}`} />
      );
    case "Database":
      return (
        <Database className={className} id={`icon-${name.toLowerCase()}`} />
      );
    case "Server":
      return <Server className={className} id={`icon-${name.toLowerCase()}`} />;
    case "Zap":
      return <Zap className={className} id={`icon-${name.toLowerCase()}`} />;
    case "Cloud":
      return <Cloud className={className} id={`icon-${name.toLowerCase()}`} />;
    case "Cpu":
      return <Cpu className={className} id={`icon-${name.toLowerCase()}`} />;
    case "Container":
      return (
        <Container className={className} id={`icon-${name.toLowerCase()}`} />
      );
    case "CloudLightning":
      return (
        <CloudLightning
          className={className}
          id={`icon-${name.toLowerCase()}`}
        />
      );
    case "Send":
      return <Send className={className} id={`icon-${name.toLowerCase()}`} />;
    default:
      return <FileCode className={className} id={`icon-fallback`} />;
  }
};
