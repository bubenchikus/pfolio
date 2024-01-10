import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Skeleton from "@mui/material/Skeleton";
import universalStyles from "../UniversalStyles.module.scss";
import styles from "./GalleryTemplate.module.scss";
import { Link } from "react-router-dom";

const SeriesGalleryTemplate = ({
  series,
  seriesDescriptions,
  images,
  clientWidth,
  loaded,
  setLoaded,
}) => {
  return (
    <div className={universalStyles.blockContainer}>
      <div className={universalStyles.blockTitle}>{`Series: ${
        series ? series : "no-series"
      }`}</div>
      {seriesDescriptions ? (
        <div className={universalStyles.blockText}>
          {seriesDescriptions?.filter((el) => el.series === series)[0]?.txt}
        </div>
      ) : (
        <></>
      )}
      <ImageList
        sx={{ margin: "15px 0", padding: "2px" }}
        cols={Math.max(Math.floor(clientWidth / 320), 2)}
        variant={"standard"}
        gap={6}
      >
        {images[series]?.map((item) => (
          <Link to={`/art/${item.category}/${item.id}`}>
            <ImageListItem
              key={item.id}
              onClick={() => {
                document.body.style.overflow = "hidden";
              }}
              sx={{
                aspectRatio: "1",
                overflow: "hidden",
              }}
            >
              {loaded[item.id] ? null : (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%", height: "100%" }}
                />
              )}
              <img
                className={loaded[item.id] ? styles.img : styles.imgHidden}
                onLoad={() => {
                  loaded[item.id] = true;
                  setLoaded(loaded);
                }}
                src={
                  item.previewName
                    ? `${process.env.REACT_APP_API_URL}/pictures/previews/${item.previewName}.webp`
                    : `${process.env.REACT_APP_API_URL}/pictures/${item.category}/${item.pictureName}`
                }
                alt={item.title}
                // loading="lazy"
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </div>
  );
};

export default SeriesGalleryTemplate;
