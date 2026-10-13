import type { Metadata } from "next";
import { CommandApp } from "@/components/command/CommandApp";

export const metadata: Metadata = {
  title: "Command",
  description:
    "Aegis Command — simulation-only incident console for Northridge Wildlife Park.",
};

export default function CommandPage() {
  return <CommandApp />;
}
