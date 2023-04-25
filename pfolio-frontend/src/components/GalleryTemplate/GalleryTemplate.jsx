import React from 'react';
import axios from "../../axios";
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import universalStyles from '../UniversalStyles.module.scss'

import styles from './GalleryTemplate.module.scss';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { PageDescription } from '../PageDescription';

export const GalleryTemplate = ({url}) => {

  const [imagesData, setData] = React.useState();
  const [descriptionData, setDescription] = React.useState();
  const [seriesDescriptions, setSeriesDescriptions] = React.useState();

  const [currentImage, setCurrentImage] = React.useState();
  const[viewerIsOpen, setViewerIsOpen] = React.useState(false);

  const openLightbox= (image) => {
    setCurrentImage(image);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage();
    setViewerIsOpen(false);
  };

  React.useEffect(()=>{
      axios
      .get(url)
      .then((response) => {
        setData(response.data)})
      .catch((err) => {
        console.warn(err);
        alert('Error occured while getting images!');
      })
    }, [url])

  React.useEffect(()=>{
    axios
    .get(`/pages-descriptions/${url.substring(4)}`)
    .then((response) => {
      setDescription(response.data)})
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting descriptions!');
    })
  }, [url])

  React.useEffect(()=>{
    axios
    .get(`/series-descriptions/${url.substring(4)}`)
    .then((response) => {
      setSeriesDescriptions(response.data)})
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting descriptions!');
    })
  }, [url])

  var images = {};
  var galleryIndex = 0;
  imagesData?.forEach((element) => {
    element.galleryIndex = galleryIndex;
    galleryIndex++;
    if (element.series in images) 
    {images[element.series].push(element)}
    else
    {images[element.series] = [element]}
  })

  const iconStyle = {"color":"white", "fontSize":"60px", "padding":"10px", "cursor":"pointer"};
  const disabledIconStyle = {"color":"rgb(60,60,60)", "fontSize":"60px", "padding":"10px"};
  
  return (
  <>
  <div>{
    viewerIsOpen ? 
      <>
      <div className={styles.dark}>
      <div className={styles.carouselBox}>
          <div className={styles.carouselSidePanel}>
            <div className={styles.carouselSidePanelBox}></div>
            <div className={styles.carouselSidePanelBox}>
              {currentImage.galleryIndex > 0 ? <ArrowBackIcon sx={iconStyle} 
              onClick={() => setCurrentImage(imagesData.find(image => image.galleryIndex === currentImage?.galleryIndex - 1))}/> : <ArrowBackIcon sx={disabledIconStyle}/>}
            </div> 
          </div>
          <div className={styles.carouselMiddleBox}>
            <div className={styles.carouselImageBox}>
              <img src={`http://localhost:4444${currentImage.pictureUrl}`} className={styles.carouselImage} alt={currentImage.title}></img>
            </div>
            <div className={styles.carouselDescription}>
              <div className={styles.carouselText}>{`Title: ${currentImage.title}`}</div>
              <div className={styles.carouselText}>{currentImage.redraw ? `Redraw: yes` : `Redraw: no`}</div>
              <div className={styles.carouselText}>{currentImage.about ? `About: ${currentImage.about}` : <></>}</div>
            </div>
          </div>
          <div className={styles.carouselSidePanel}>
            <div className={styles.carouselSidePanelBox}><CloseIcon sx={iconStyle} onClick={closeLightbox}/></div>
            <div className={styles.carouselSidePanelBox}>
            {currentImage.galleryIndex < imagesData.length - 1 ? <ArrowForwardIcon sx={iconStyle} 
            onClick={() => setCurrentImage(imagesData.find(image => image.galleryIndex === currentImage?.galleryIndex + 1))}/> : <ArrowForwardIcon sx={disabledIconStyle}/>}
            </div>
          </div>
      </div>
      </div>
      </>
      : <></>
      }</div>
  <PageDescription descriptionData={descriptionData}/>
  {Object.keys(images).map((series, index1)=> {
   return ( 
   <Container key={index1}>
   <div className={universalStyles.blockContainer}>
   <div className={universalStyles.blockTitle}>{`Series: ${series}`}</div>
   <>{(seriesDescriptions)
   ? <div className={universalStyles.blockText} >{seriesDescriptions.filter((el)=>el.series === series)[0]?.txt}</div> 
   : <></>}</>  
   <ImageList sx={{'margin':'15px 0', "padding":'2px'}} cols={5} variant={'standard'} gap={6}>
    {images[series].map((item) => (
      <ImageListItem key={item.id} rows={1} cols={1} 
      onClick={() => openLightbox(imagesData.find(image => image.galleryIndex === item.galleryIndex))}
      sx={{
      'aspectRatio': '1',
      'overflow': 'hidden' 
      }}>
        <img
          className={styles.img}
          src={`http://localhost:4444${item.pictureUrl}`}
          srcSet={`http://localhost:4444${item.pictureUrl}`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
    </ImageList>
    </div>
    </Container>
    )})}
  </>)
};