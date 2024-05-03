import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import { Zoom } from "react-toastify";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    Zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      const res = await fromAddress(
        `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zip}`
      );

      const { lat, lng } = res.results[0].geometry.location;
    };
  }, []);

  return <div>PropertyMap</div>;
};

export default PropertyMap;
