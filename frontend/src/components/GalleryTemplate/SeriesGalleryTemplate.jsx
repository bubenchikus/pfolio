import React from "react";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import universalStyles from "../UniversalStyles.module.scss";
import styles from "./GalleryTemplate.module.scss";

const SeriesGalleryTemplate = ({
  series,
  seriesDescriptions,
  index,
  images,
  clientWidth,
  setCurrentImage,
  setViewerIsOpen,
}) => {
  return (
    <Container>
      <div className={universalStyles.blockContainer}>
        <div className={universalStyles.blockTitle}>{`Series: ${
          series ? series : "no-series"
        }`}</div>
        <>
          {seriesDescriptions ? (
            <div className={universalStyles.blockText}>
              {seriesDescriptions?.filter((el) => el.series === series)[0]?.txt}
            </div>
          ) : (
            <></>
          )}
        </>
        <ImageList
          sx={{ margin: "15px 0", padding: "2px" }}
          cols={Math.max(Math.floor(clientWidth / 350), 2)}
          variant={"standard"}
          gap={6}
        >
          {images[series]?.map((item) => (
            <ImageListItem
              key={item.id}
              rows={1}
              cols={1}
              onClick={() => {
                setCurrentImage(
                  images[series].find(
                    (image) => image.galleryIndex === item.galleryIndex
                  )
                );
                setViewerIsOpen(true);
              }}
              sx={{
                aspectRatio: "1",
                overflow: "hidden",
              }}
            >
              <img
                key={item.id}
                className={styles.img}
                src={
                  item.previewName
                    ? `${process.env.REACT_APP_API_URL}/pictures/previews/${item.previewName}.webp`
                    : `${process.env.REACT_APP_API_URL}/pictures/${item.category}/${item.pictureName}`
                }
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </Container>
  );
};

export default SeriesGalleryTemplate;
