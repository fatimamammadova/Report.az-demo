import { Montserrat } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./styles/_globals.scss";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    template: '%s | Report.az',
    default: 'Azərbaycanın aparıcı xəbər saytı | Report.az' 
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-theme="light">
      <body suppressHydrationWarning={true} className={montserrat.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
