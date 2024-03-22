import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProviders } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Just Another Social Media",
  description: "This is a social media app built with Next.js and Postgres.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>{children}</AuthProviders>
      </body>
    </html>
  );
}
