import React from "react";
import GalleryTemplate from "../components/GalleryTemplate/GalleryTemplate";
import PageTitle from "../components/PageTitle";

const GalleryPage = () => {
  return (
    <>
      <PageTitle
        pageTitle={`${window.location.href
          .substring(window.location.href.lastIndexOf("/") + 1)
          .replace(/-/g, " ")} gallery`}
      />
      <GalleryTemplate />
    </>
  );
};

export default GalleryPage;
