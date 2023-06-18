import { useState, useEffect, useLayoutEffect } from "react";
import axios from "../../axios";

import sorterByCreate from "./helpers/sorterByCreate";
import getSeriesArrangementFromImages from "./helpers/getSeriesArrangementFromImages";
import sortImagesBySeries from "./helpers/sortImagesBySeries";

import PageDescription from "../PageDescription";
import CarouselTemplate from "./CarouselTemplate";
import SeriesGalleryTemplate from "./SeriesGalleryTemplate";

const GalleryTemplate = ({ url }) => {
  const [images, setImages] = useState();
  const [descriptionData, setDescription] = useState();
  const [seriesDescriptions, setSeriesDescriptions] = useState();

  const [currentImage, setCurrentImage] = useState();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
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

  useLayoutEffect(() => {
    function updateWidth() {
      setClientWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
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
