import type { Metadata, Viewport } from "next";
import { Anton } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import { Container } from "react-bootstrap";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Next SWR PokeDex",
  description: "PokeDex using NextJS and SWR",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={anton.className}>
        <main>
          <Container className="py-4">{children}</Container>
        </main>
      </body>
    </html>
  );
}
