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

export const GalleryTemplate = ({url}) => {

  const [imagesData, setData] = React.useState();
  const [descriptionData, setDescription] = React.useState();

  const [currentImage, setCurrentImage] = React.useState(0);
  const[viewerIsOpen, setViewerIsOpen] = React.useState(false);

  const openLightbox= (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
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
    .get(`${url}/description`)
    .then((response) => {
      setDescription(response.data)})
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting descriptions!');
    })
  }, [url])

  var images = {};
  var idToGalleryIndex = {}

  var galleryIndex = 0;
  imagesData?.forEach((element) => {
    // imagesData.find(image => image.id === element.id).galleryIndex = galleryIndex;
    idToGalleryIndex[element.id] = galleryIndex;
    element.galleryIndex = galleryIndex;
    galleryIndex++;
    if (element.series in images) 
    {images[element.series].push(element)}
    else
    {images[element.series] = [element]}
  })

  var descriptions = {};

  descriptionData?.forEach((element) => {
    descriptions[element.series]=element.txt
  })

  const iconStyle = {"color":"white", "fontSize":"60px", "padding":"10px"};
  
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
              {currentImage > 0 ? <ArrowBackIcon sx={iconStyle} onClick={() => setCurrentImage(currentImage - 1)}/> : <></>}
            </div> 
          </div>
          <div className={styles.carouselMiddleBox}>
            <div className={styles.carouselImageBox}>
              <img src={`http://localhost:4444${imagesData.find(el => el.galleryIndex === currentImage).pictureUrl}`} className={styles.carouselImage}></img>
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
            {currentImage < imagesData.length - 1 ? <ArrowForwardIcon sx={iconStyle} onClick={() => setCurrentImage(currentImage + 1)}/> : <></>}
            </div>
          </div>
      </div>
      </div>
      </>
      : <></>
      }</div>
  {Object.keys(images).map((series, index1)=> {
   return ( 
   <Container key={index1}>
   <div className={universalStyles.blockContainer}>
   <div className={universalStyles.blockTitle}>{`Series: ${series}`}</div>
   <>{descriptions[series]?.length>0 ? <div className={universalStyles.blockText} >{descriptions[series]}</div> : <></>}</>
   
   <ImageList sx={{'margin':'15px 0', "padding":'2px'}} cols={5} variant={'standard'} gap={6}>
    {images[series].map((item) => (
      <ImageListItem key={item.id} rows={1} cols={1} 
      onClick={() => openLightbox(item.galleryIndex)}
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
    
    )
    

  }
  )
  }
  
  </>)
};