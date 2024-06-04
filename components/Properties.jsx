"use client";
import { useEffect, useState } from "react";
import PropertiesCard from "@/components/PropertiesCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Properties = async () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${apiDomain}/properties?page=${page}&pageSize=${pageSize}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("failed to fetch data");
        }

        const data = await res.json();
        const { properties, total } = data;
        properties.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProperties(properties);
        setTotalItems(total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (page) => setPage(page);

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
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;
