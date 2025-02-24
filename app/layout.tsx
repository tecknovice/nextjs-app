import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter } from '@/lib/fonts';


export const metadata: Metadata = {
  title: {
    template: '%s | Nextjs App',
    default: 'Nextjs App',
  },
  description: 'Nextjs App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
