// src/app/layout.js
import { ResumeProvider } from "./../context/ResumeContext"; // Adjusted path to your context
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="bg-black text-white selection:bg-fuchsia-500/30"
      >
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
