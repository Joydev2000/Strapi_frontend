import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header/page";
import Footer from "./Footer/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
