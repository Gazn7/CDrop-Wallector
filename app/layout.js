import "./globals.css";
import { LanguageProvider } from "../components/LanguageContext";

export const metadata = {
  title: "Criticaldrop | Wallector",
  description:
    "Criticaldrop builds AI products, agents, ChatGPT apps and custom software. Wallector is the vertical ChatGPT app for the art market."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
