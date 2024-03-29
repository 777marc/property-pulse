"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";

const SingleProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return <div>SingleProperty</div>;
};

export default SingleProperty;
