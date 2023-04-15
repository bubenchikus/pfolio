import React from 'react';
import axios from "../../axios";
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import universalStyles from '../UniversalStyles.module.scss'

export const GalleryTemplate = ({url}) => {

  const [imagesData, setData] = React.useState();
  const [descriptionData, setDescription] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(()=>{
      axios
      .get(url)
      .then((response) => {
        setData(response.data)
        setLoading(false)})
      .catch((err) => {
        console.warn(err);
        alert('Error occured while getting images!');
      })
    }, [])

  React.useEffect(()=>{
    axios
    .get(`${url}/description`)
    .then((response) => {
      setDescription(response.data)
      setLoading(false)})
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting descriptions!');
    })
  }, [])

  var images = {};

  imagesData?.forEach((element) => {
    if (element.series in images) 
    {images[element.series].push(element)}
    else
    {images[element.series] = [element]}
  })

  var descriptions = {};

  descriptionData?.forEach((element) => {
    descriptions[element.series]=element.txt
  })

  return (
  <>
  {Object.keys(images).map((series, index1)=> {
   return ( 
   <Container key={index1}>
   <div className={universalStyles.blockContainer}>
   <div className={universalStyles.blockTitle}>{`Series: ${series}`}</div>
   <div className={universalStyles.blockText} >{descriptions[series]}</div> 
   <ImageList sx={{'margin':'20px 0', "padding":'2px'}} cols={5} variant={'standard'} gap={6}>
    {images[series].map((item, index2) => (
      <ImageListItem key={index2} rows={1} cols={1} 
      sx={{
      'boxShadow': '-1px 2px 2px black', 
      'aspectRatio': '1',
      'overflow': 'hidden' 
      }}>
        <img
          className={universalStyles.img}
          src={`http://localhost:4444${item.pictureUrl}`}
          srcSet={`http://localhost:4444${item.pictureUrl}`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
    </ImageList>
    </div>
    </Container>)

  })}
  
  </>)
};