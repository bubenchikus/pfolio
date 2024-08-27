import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Skeleton from "@mui/material/Skeleton";
import universalStyles from "../UniversalStyles.module.scss";
import styles from "./GalleryTemplate.module.scss";
import { Link } from "react-router-dom";

const SeriesGalleryTemplate = ({
  series,
  seriesDescription,
  images,
  clientWidth,
  loaded,
  setLoaded,
}) => {
  const imagesList = images?.map((item) => (
    <Link to={`/art/${item.category}/${item.id}`} key={item.id}>
      <ImageListItem
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
          className={loaded[item.id] ? styles.img : styles["img-hidden"]}
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
        />
      </ImageListItem>
    </Link>
  ));
  return (
    <div className={universalStyles["block-container"]}>
      <div className={universalStyles["block-title"]}>{`Series: ${
        series ? series : "no-series"
      }`}</div>
      {seriesDescription ? (
        <div className={universalStyles["block-text"]}>{seriesDescription}</div>
      ) : (
        <></>
      )}
      <ImageList
        sx={{ margin: "15px 0", padding: "2px" }}
        cols={Math.max(Math.floor(clientWidth / 300), 2)}
        variant={"standard"}
        gap={6}
        children={imagesList ?? []}
      ></ImageList>
    </div>
  );
};

export default SeriesGalleryTemplate;
