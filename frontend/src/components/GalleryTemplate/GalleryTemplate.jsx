import React from "react";
import axios from "../../axios";

import sorterByCreate from "./helpers/sorterByCreate";
import getSeriesArrangementFromImages from "./helpers/getSeriesArrangementFromImages";
import sortImagesBySeries from "./helpers/sortImagesBySeries";

import PageDescription from "../PageDescription";
import CarouselTemplate from "./CarouselTemplate";
import SeriesGalleryTemplate from "./SeriesGalleryTemplate";

const GalleryTemplate = ({ url }) => {
  const [images, setImages] = React.useState();
  const [descriptionData, setDescription] = React.useState();
  const [seriesDescriptions, setSeriesDescriptions] = React.useState();

  const [currentImage, setCurrentImage] = React.useState();
  const [viewerIsOpen, setViewerIsOpen] = React.useState(false);

  const [clientWidth, setClientWidth] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setImages(
          sortImagesBySeries(
            response?.data?.sort(function (a, b) {
              return sorterByCreate(a, b);
            })
          )
        );
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting images!");
      });
  }, [url]);

  React.useEffect(() => {
    axios
      .get(`/pages-descriptions/${url.substring(4)}`)
      .then((response) => {
        setDescription(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting descriptions!");
      });
  }, [url]);

  React.useEffect(() => {
    axios
      .get(`/series-descriptions/${url.substring(4)}`)
      .then((response) => {
        setSeriesDescriptions(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting descriptions!");
      });
  }, [url]);

  React.useLayoutEffect(() => {
    function updateWidth() {
      setClientWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      <>
        {viewerIsOpen ? (
          <CarouselTemplate
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            setViewerIsOpen={setViewerIsOpen}
            clientWidth={clientWidth}
            images={images}
          />
        ) : (
          <></>
        )}
      </>

      <PageDescription descriptionData={descriptionData} />

      {getSeriesArrangementFromImages(images, seriesDescriptions)?.map(
        (series, index) => {
          return (
            <SeriesGalleryTemplate
              series={series}
              key={index}
              seriesDescriptions={seriesDescriptions}
              images={images}
              clientWidth={clientWidth}
              setCurrentImage={setCurrentImage}
              setViewerIsOpen={setViewerIsOpen}
            />
          );
        }
      )}
    </>
  );
};

export default GalleryTemplate;
