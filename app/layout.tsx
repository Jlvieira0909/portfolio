import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeContext";
import RandomFavicon from "./components/RandomFavicon/RandomFavicon";
import "./globals.css";

export const metadata: Metadata = {
  title: "João Luiz | Portfolio",
  description: "Desenvolvedor Front-end & Designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <RandomFavicon />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
