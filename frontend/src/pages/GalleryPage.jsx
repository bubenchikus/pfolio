import React from "react";
import GalleryTemplate from "../components/GalleryTemplate/GalleryTemplate";
import PageTitle from "../components/PageTitle";

const GalleryPage = ({ category }) => {
  return (
    <>
      <PageTitle pageTitle={category} />
      <GalleryTemplate category={category} />
    </>
  );
};

export default GalleryPage;
