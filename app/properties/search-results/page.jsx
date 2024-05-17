"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import PropertiesCard from "@/components/PropertiesCard";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" />
            Back to Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
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

export default SearchResultsPage;
