import GalleryTemplate from "../components/GalleryTemplate/GalleryTemplate";
import PageTitle from "../components/PageTitle";

const GalleryPage = ({ pageTitle, url }) => {
  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <GalleryTemplate url={url} />
    </>
  );
};

export default GalleryPage;
