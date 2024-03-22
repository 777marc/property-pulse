import properties from "@/properties2.json";
import PropertiesCard from "../../components/PropertiesCard";
const PropertiesPage = () => {
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.lenth === 0 ? (
            <p>No Properties Found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => {
                return (
                  <PropertiesCard key={property._id} property={property} />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
