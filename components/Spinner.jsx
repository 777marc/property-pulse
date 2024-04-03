"use client";
import { ClipLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  const override = {
    display: "block",
    margin: "100px auto",
  };

  return (
    <ClipLoader
      color="#3be2f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
