"use client";
import { useState, useEffect } from "react";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import Spinner from "./Spinner";

const FeaturedProperties = () => {
  const [featruedProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProperties();
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        {featruedProperties.lenth === 0 ? (
          <p>No Featured Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featruedProperties.map((property) => {
              return (
                <FeaturedPropertyCard key={property._id} property={property} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
