import "@/app/ui/global.css";
import { GoogleInterFont } from "./lib/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-us">
      <body className={`${GoogleInterFont.className} antialiased`}>{children}</body>
    </html>
  );
}
