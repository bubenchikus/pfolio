import styles from "./GalleryTemplate.module.scss";
import universalStyles from "../UniversalStyles.module.scss";
import styleConstants from "../../styleConstants.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CarouselTemplate = ({
  currentImage,
  nextImageId,
  prevImageId,
  clientWidth,
}) => {
  const [loaded, setLoaded] = useState(false);

  const iconFontStyle = `${
    clientWidth > parseInt(styleConstants["mobile-width"])
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

  return currentImage ? (
    <div className={universalStyles.dark}>
      <div className={styles["carousel-box"]}>
        <div className={styles["carousel-side-panel"]}>
          <div className={styles["carousel-side-panelBox"]}></div>
          {prevImageId ? (
            <Link to={`/art/${currentImage.category}/${prevImageId}`}>
              <ArrowBackIcon
                sx={iconStyle}
                onClick={() => {
                  setLoaded(false);
                }}
              />
            </Link>
          ) : (
            <ArrowBackIcon sx={disabledIconStyle} />
          )}
        </div>

        <div className={styles["carousel-middle-box"]}>
          {loaded ? null : (
            <CircularProgress sx={{ position: "absolute", color: "white" }} />
          )}
          <div
            className={
              loaded ? styles["carousel-image-box"] : styles["img-hidden"]
            }
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/pictures/${currentImage?.category}/${currentImage?.pictureName}`}
              className={styles["carousel-image"]}
              alt={currentImage.title ?? ""}
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div
            className={
              loaded ? styles["carousel-description"] : styles["img-hidden"]
            }
          >
            <div
              className={styles["carousel-text"]}
            >{`Title: ${currentImage?.title}`}</div>
            <div className={styles["carousel-text"]}>
              {`Redraw: ${currentImage?.redraw ? "yes" : "no"}`}
            </div>
            <div className={styles["carousel-text"]}>
              {`Created: ${currentImage?.created}`}
            </div>
            {currentImage?.about ? (
              <div className={styles["carousel-text"]}>
                `About: ${currentImage?.about}`
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className={styles["carousel-side-panel"]}>
          <div>
            <Link to={`/art/${currentImage.category}`}>
              <CloseIcon
                sx={iconStyle}
                onClick={() => {
                  document.body.style.overflow = "visible";
                }}
              />
            </Link>
          </div>
          <div className={styles["carousel-side-panelBox"]}>
            {nextImageId ? (
              <Link to={`/art/${currentImage.category}/${nextImageId}`}>
                <ArrowForwardIcon
                  sx={iconStyle}
                  onClick={() => {
                    setLoaded(false);
                  }}
                />
              </Link>
            ) : (
              <ArrowForwardIcon sx={disabledIconStyle} />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CarouselTemplate;
