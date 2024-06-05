"use client";
import { useState, useEffect } from "react";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties = () => {
  const [featruedProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const res = await fetch(`/api/properties/featured`);
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        const data = await res.json();

        setFeaturedProperties(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeaturedProperties();
  }, []);

  return (
    featruedProperties.length > 0 && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featruedProperties.map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
