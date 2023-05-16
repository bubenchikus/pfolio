import React from "react";
import axios from "../../axios";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import universalStyles from "../UniversalStyles.module.scss";
import styles from "./GalleryTemplate.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { PageDescription } from "../PageDescription";

export const GalleryTemplate = ({ url }) => {
  const [imagesData, setData] = React.useState();
  const [descriptionData, setDescription] = React.useState();
  const [seriesDescriptions, setSeriesDescriptions] = React.useState();

  const [currentImage, setCurrentImage] = React.useState();
  const [viewerIsOpen, setViewerIsOpen] = React.useState(false);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage();
    setViewerIsOpen(false);
  };

  React.useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(
          response?.data?.sort(function (a, b) {
            const a_month = a.created?.split("-")[0] || "0";
            const a_year = a.created?.split("-")[1] || "0";
            const b_month = b.created?.split("-")[0] || "0";
            const b_year = b.created?.split("-")[1] || "0";
            return a_year > b_year
              ? 1
              : a_year < b_year
              ? -1
              : a_month > b_month
              ? 1
              : a_month < b_month
              ? -1
              : 0;
          })
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

  var images = {};
  var galleryIndexes = {};
  imagesData?.forEach((element) => {
    if (galleryIndexes[element.series]) {
      element.galleryIndex = galleryIndexes[element.series];
      galleryIndexes[element.series] += 1;
    } else {
      element.galleryIndex = 0;
      galleryIndexes[element.series] = 1;
    }

    if (element.series in images) {
      images[element.series].push(element);
    } else {
      images[element.series] = [element];
    }
  });

  const clientWidth = document.documentElement.clientWidth;

  const iconFontStyle = `${
    clientWidth > 850
      ? Math.floor(clientWidth / 30)
      : Math.floor(clientWidth / 10)
  }px`;

  const iconStyle = {
    color: "white",
    fontSize: iconFontStyle,
    padding: "10px",
    cursor: "pointer",
  };

  const disabledIconStyle = {
    color: "rgb(60,60,60)",
    fontSize: iconFontStyle,
    padding: "10px",
  };

  function numToMonth(num) {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return months[num - 1];
  }

  return (
    <>
      <div>
        {viewerIsOpen ? (
          <div className={styles.dark}>
            <div className={styles.carouselBox}>
              <div className={styles.carouselSidePanel}>
                <div className={styles.carouselSidePanelBox}></div>
                <div className={styles.carouselSidePanelBox}>
                  {currentImage.galleryIndex > 0 ? (
                    <ArrowBackIcon
                      sx={iconStyle}
                      onClick={() =>
                        setCurrentImage(
                          imagesData.find(
                            (image) =>
                              image?.galleryIndex ===
                                currentImage?.galleryIndex - 1 &&
                              image?.series === currentImage?.series
                          )
                        )
                      }
                    />
                  ) : (
                    <ArrowBackIcon sx={disabledIconStyle} />
                  )}
                </div>
              </div>
              <div className={styles.carouselMiddleBox}>
                <div className={styles.carouselImageBox}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/pictures/${currentImage.category}/${currentImage.pictureName}`}
                    className={styles.carouselImage}
                    alt={currentImage.title}
                  ></img>
                </div>
                <div className={styles.carouselDescription}>
                  <div
                    className={styles.carouselText}
                  >{`Title: ${currentImage.title}`}</div>
                  <div className={styles.carouselText}>
                    {currentImage.redraw ? `Redraw: yes` : `Redraw: no`}
                  </div>
                  <div className={styles.carouselText}>
                    {currentImage.created &&
                    currentImage.created.split("-")[1] !== "0"
                      ? `Created: ${
                          currentImage.created[0] === "0"
                            ? currentImage.created.split("-")[1]
                            : `${numToMonth(
                                currentImage.created.split("-")[0]
                              )} ${currentImage.created.split("-")[1]}`
                        }`
                      : `Created: unknown`}
                  </div>
                  <div className={styles.carouselText}>
                    {currentImage.about ? (
                      `About: ${currentImage.about}`
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.carouselSidePanel}>
                <div className={styles.carouselSidePanelBox}>
                  <CloseIcon sx={iconStyle} onClick={closeLightbox} />
                </div>
                <div className={styles.carouselSidePanelBox}>
                  {currentImage.galleryIndex <
                  images[currentImage.series].length - 1 ? (
                    <ArrowForwardIcon
                      sx={iconStyle}
                      onClick={() =>
                        setCurrentImage(
                          imagesData.find(
                            (image) =>
                              image?.galleryIndex ===
                                currentImage?.galleryIndex + 1 &&
                              image?.series === currentImage?.series
                          )
                        )
                      }
                    />
                  ) : (
                    <ArrowForwardIcon sx={disabledIconStyle} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <PageDescription descriptionData={descriptionData} />
      {Object.keys(images).map((series, index1) => {
        return (
          <Container key={index1}>
            <div className={universalStyles.blockContainer}>
              <div className={universalStyles.blockTitle}>{`Series: ${
                series ? series : "no-series"
              }`}</div>
              <>
                {seriesDescriptions ? (
                  <div className={universalStyles.blockText}>
                    {
                      seriesDescriptions.filter((el) => el.series === series)[0]
                        ?.txt
                    }
                  </div>
                ) : (
                  <></>
                )}
              </>
              <ImageList
                sx={{ margin: "15px 0", padding: "2px" }}
                cols={`${Math.floor(clientWidth / 350)}`}
                variant={"standard"}
                gap={6}
              >
                {images[series].map((item) => (
                  <ImageListItem
                    key={item.id}
                    rows={1}
                    columns={1}
                    onClick={() =>
                      openLightbox(
                        imagesData.find(
                          (image) =>
                            image.galleryIndex === item.galleryIndex &&
                            image.series === item.series
                        )
                      )
                    }
                    sx={{
                      aspectRatio: "1",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      className={styles.img}
                      src={`${process.env.REACT_APP_API_URL}/pictures/${item.category}/${item.pictureName}`}
                      srcSet={`${process.env.REACT_APP_API_URL}/pictures/${item.category}/${item.pictureName}`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </Container>
        );
      })}
    </>
  );
};
