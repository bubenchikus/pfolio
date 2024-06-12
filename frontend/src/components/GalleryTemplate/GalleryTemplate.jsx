import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "../../axios";
import PageDescription from "../PageDescription";
import CarouselTemplate from "./CarouselTemplate";
import SeriesGalleryTemplate from "./SeriesGalleryTemplate";
import { useParams } from "react-router-dom";

const GalleryTemplate = ({ category }) => {
  let { id } = useParams();

  const [images, setImages] = useState();
  const [descriptionData, setDescription] = useState();
  const [seriesDescriptions, setSeriesDescriptions] = useState();

  const [clientWidth, setClientWidth] = useState(0);

  const [loaded, setLoaded] = useState({});

  const [currentImage, setCurrentImage] = useState();

  const [nextImageId, setNextImageId] = useState();
  const [prevImageId, setPrevImageId] = useState();

  useEffect(() => {
    axios
      .get(`art/${category}`)
      .then((res) => {
        setImages(res?.data);
      })
      .catch(() => {
        console.error("Error occured while getting images!");
      });

    axios
      .get(`/pages-descriptions/${category}`)
      .then((res) => {
        setDescription(res.data);
      })
      .catch(() => {
        console.error("Error occured while getting descriptions!");
      });

    axios
      .get(`/series-descriptions/${category}`)
      .then((res) => {
        setSeriesDescriptions(res.data);
      })
      .catch(() => {
        console.error("Error occured while getting descriptions!");
      });
  }, [category]);

  useEffect(() => {
    if (id && images) {
      const tempCurrentImage = Object?.values(images)
        .flat(1)
        .find((el) => el.id === parseInt(id));

      if (tempCurrentImage) {
        setCurrentImage(tempCurrentImage);

        setPrevImageId(
          images[tempCurrentImage?.series][tempCurrentImage?.galleryIndex - 1]
            ?.id
        );
        setNextImageId(
          images[tempCurrentImage?.series][tempCurrentImage?.galleryIndex + 1]
            ?.id
        );
      }
    }
  }, [id, images]);

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
      {id ? (
        <CarouselTemplate
          currentImage={currentImage}
          nextImageId={nextImageId}
          prevImageId={prevImageId}
          clientWidth={clientWidth}
        />
      ) : (
        <></>
      )}

      <PageDescription descriptionData={descriptionData} />

      {seriesDescriptions?.map((el, index) => {
        return images && Object.keys(images)?.includes(el?.series) ? (
          <SeriesGalleryTemplate
            key={index}
            series={el?.series}
            seriesDescription={el?.series.txt}
            images={images[el?.series]}
            clientWidth={clientWidth}
            loaded={loaded}
            setLoaded={setLoaded}
          />
        ) : (
          <></>
        );
      })}
    </>
  );
};

export default GalleryTemplate;
