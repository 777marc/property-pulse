import "@/assets/styles/global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "finding the perfect rental property",
  keywords: "rental property, dream vacation",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
