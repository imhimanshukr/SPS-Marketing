import type { Metadata } from "next";
import "./globals.css";
import Provider from "../Provider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export const metadata: Metadata = {
  title: "SPS Mega Mart - Apke Zaruraton Ka Sathi ...",
  description: "Best place to purchage groceries.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AppRouterCacheProvider>
        <Provider>
          {children}
        </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
