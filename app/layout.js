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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
        <script dangerouslySetInnerHTML={{ __html: `if('scrollRestoration'in history)history.scrollRestoration='manual';window.scrollTo(0,0);document.documentElement.scrollTop=0;var v=document.querySelector('meta[name=viewport]');if(v){v.content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';}` }} />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `window.scrollTo(0,0);` }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
