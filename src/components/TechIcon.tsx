import React from "react";
import {
  Atom,
  Braces,
  Layers,
  Flame,
  Wind,
  Sparkles,
  Database,
  Server,
  Zap,
  Cloud,
  Cpu,
  Container,
  CloudLightning,
  Send,
  FileCode,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TechIconProps {
  name: string;
  className?: string;
}

const ICONS: Record<string, LucideIcon> = {
  CodeReact: Atom,
  TypeScript: Braces,
  TanStack: Layers,
  Svelte: Flame,
  Tailwind: Wind,
  Sparkles,
  Database,
  Server,
  Zap,
  Cloud,
  Cpu,
  Container,
  CloudLightning,
  Send,
};

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = "w-6 h-6",
}) => {
  const Icon = ICONS[name];

  if (!Icon) {
    return (
      <FileCode className={className} id="icon-fallback" aria-hidden="true" />
    );
  }

  return (
    <Icon
      className={className}
      id={`icon-${name.toLowerCase()}`}
      aria-hidden="true"
    />
  );
};
