import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/pixelify-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuantLab — Trading cuantitativo de nivel institucional",
  description: "Herramientas cuantitativas de nivel institucional al alcance de los traders que se toman en serio su trabajo.",
  icons: {
    icon: "/ico.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
