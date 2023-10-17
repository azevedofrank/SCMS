import { type ReactNode } from "react";

export type LayoutTheme = "dark" | "light";

export interface LayoutProps {
  theme?: LayoutTheme;
  children: ReactNode;
  showHeader?: boolean;
  xs?: string;
}
