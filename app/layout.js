import { Cairo } from "next/font/google";
import "./globals.css";
import StoreProvider from "./assits/libs/StoreProvider";
import NavBar from "./assits/comps/Navbar";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata = {
  title: "موقع موسوعة الكتب",
  description: "موقع موسوعة الكتب هو موقع اليكترونى للقراء المهتمين بقراءة وتحميل الكتب PDF ......",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body dir="rtl" className={cairo.className}>
          <NavBar />
          <div className="w-full mt-[60px] bg-white">

          {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
