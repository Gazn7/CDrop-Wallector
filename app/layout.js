import "./globals.css";

export const metadata = {
  title: "Wallector | A ChatGPT app for the art market",
  description:
    "Wallector is a custom ChatGPT app connected to a real art catalog. Users search the entire inventory just by talking."
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
        {children}
      </body>
    </html>
  );
}
