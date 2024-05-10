"use client";
import { useEffect, useState } from "react";
import PropertiesCard from "@/components/PropertiesCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await fetch(`/api/bookmarks`);
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data.properties);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h1 className="text-2xl mb-4">Saved Properties</h1>
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
      ;
    </>
  );
};

export default SavedPropertiesPage;
