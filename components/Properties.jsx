"use client";
import { useEffect, useState } from "react";
import PropertiesCard from "@/components/PropertiesCard";
import Spinner from "./Spinner";

const Properties = async () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${apiDomain}/properties`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("failed to fetch data");
        }

        const properties = await res.json();

        properties.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProperties(properties);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.lenth === 0 ? (
          <p>No Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => {
              return <PropertiesCard key={property._id} property={property} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
