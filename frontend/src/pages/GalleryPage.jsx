import GalleryTemplate from "../components/GalleryTemplate/GalleryTemplate";
import PageTitle from "../components/PageTitle";

const GalleryPage = ({ pageTitle }) => {
  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <GalleryTemplate />
    </>
  );
};

export default GalleryPage;
