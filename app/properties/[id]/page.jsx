"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import { useSession } from "next-auth/react";

const SingleProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return null;

      try {
        const property = await fetchProperty(id);
        if (property) setProperty(property);
      } catch (error) {
        console.log(`Error fetching property: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !isLoading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Propety Not Found
      </h1>
    );
  }

  return (
    <>
      {isLoading && <Spinner loading={true} />}
      {!isLoading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2"></FaArrowLeft> Back to Properties
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />
                  {session && <PropertyContactForm property={property} />}
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default SingleProperty;
