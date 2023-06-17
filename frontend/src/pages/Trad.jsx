import React from "react";
import GalleryTemplate from "../components/GalleryTemplate/GalleryTemplate";
import PageTitle from "../components/PageTitle";

const Trad = () => {
  return (
    <>
      <PageTitle pageTitle="Traditional" />
      <GalleryTemplate url="art/trad" />
    </>
  );
};

export default Trad;
