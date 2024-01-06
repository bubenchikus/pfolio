import styles from "./GalleryTemplate.module.scss";
import styleConstants from "../../styleConstants.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const CarouselTemplate = ({
  currentImage,
  setCurrentImage,
  setViewerIsOpen,
  clientWidth,
  images,
}) => {
  const [loaded, setLoaded] = useState(false);

  const iconFontStyle = `${
    clientWidth > parseInt(styleConstants.mobileWidth)
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

  return (
    <div className={styles.dark}>
      <div className={styles.carouselBox}>
        <div className={styles.carouselSidePanel}>
          <div className={styles.carouselSidePanelBox}></div>
          {currentImage.galleryIndex > 0 ? (
            <ArrowBackIcon
              sx={iconStyle}
              onClick={() => {
                setLoaded(false);
                setCurrentImage(
                  images[currentImage.series].find(
                    (image) =>
                      image?.galleryIndex === currentImage?.galleryIndex - 1 &&
                      image?.series === currentImage?.series
                  )
                );
              }}
            />
          ) : (
            <ArrowBackIcon sx={disabledIconStyle} />
          )}
        </div>

        <div className={styles.carouselMiddleBox}>
          {loaded ? null : (
            <CircularProgress sx={{ position: "absolute", color: "white" }} />
          )}
          <div className={loaded ? styles.carouselImageBox : styles.imgHidden}>
            <img
              src={`${process.env.REACT_APP_API_URL}/pictures/${currentImage.category}/${currentImage.pictureName}`}
              className={styles.carouselImage}
              alt={currentImage.title}
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div
            className={loaded ? styles.carouselDescription : styles.imgHidden}
          >
            <div
              className={styles.carouselText}
            >{`Title: ${currentImage.title}`}</div>
            <div className={styles.carouselText}>
              {`Redraw: ${currentImage.redraw ? "yes" : "no"}`}
            </div>
            <div className={styles.carouselText}>
              {`Created: ${currentImage.created}`}
            </div>
            {currentImage.about ? (
              <div className={styles.carouselText}>
                `About: ${currentImage.about}`
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className={styles.carouselSidePanel}>
          <CloseIcon
            sx={iconStyle}
            onClick={() => {
              setCurrentImage();
              setViewerIsOpen(false);
            }}
          />
          <div className={styles.carouselSidePanelBox}>
            {currentImage.galleryIndex <
            images[currentImage.series].length - 1 ? (
              <ArrowForwardIcon
                sx={iconStyle}
                onClick={() => {
                  setLoaded(false);
                  setCurrentImage(
                    images[currentImage.series].find(
                      (image) =>
                        image?.galleryIndex ===
                          currentImage?.galleryIndex + 1 &&
                        image?.series === currentImage?.series
                    )
                  );
                }}
              />
            ) : (
              <ArrowForwardIcon sx={disabledIconStyle} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselTemplate;
