import "@/assets/styles/global.css";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "finding the perfect rental property",
  keywords: "rental property, dream vacation",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
