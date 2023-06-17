import React from "react";
import GalleryTemplate from "../components/GalleryTemplate/GalleryTemplate";
import PageTitle from "../components/PageTitle";

const Comics = () => {
  return (
    <>
      <PageTitle pageTitle="Stories materials" />
      <GalleryTemplate url="art/comics" />
    </>
  );
};

export default Comics;
