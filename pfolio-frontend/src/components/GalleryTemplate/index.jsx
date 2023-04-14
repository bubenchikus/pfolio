import React from 'react';
import axios from "../../axios";
import styles from './GalleryTemplate.module.scss';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const GalleryTemplate = ({url}) => {

  const [data, setData] = React.useState();
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

    }, [url])

    var images = {};

    data?.forEach((element) => {
      if (element.series in images) 
      {images[element.series].push(element)}
      else
      {images[element.series] = [element]}
    })

  return (
  <>
  {Object.keys(images).map((series, index)=> {
   return ( 
   <Container maxWidth="lg" className='Cont' style={{
    "margin-bottom":"30px", 
    'border':'black 2px solid', 
    'border-left':'black 4px solid',
    'box-sizing': 'border-box',
    'background-color':'rgba(90,90,90,.5)'
    }}>
   <div className={styles.title}>{`Series: ${series}`}</div>
   <div className={styles.description}>Description</div> 
   <ImageList sx={{'margin':'20px 0', "padding":'2px'}} cols={5} variant={'standard'} gap={"6px"}>
    {images[series].map((item, index) => (
      <ImageListItem key={index} rows={1} cols={1} 
      sx={{
      'box-shadow': '-1px 2px 2px black', 
      'aspect-ratio': '1',
      'overflow': 'hidden'
      }}>
        <img
          src={`http://localhost:4444${item.pictureUrl}`}
          srcSet={`http://localhost:4444${item.pictureUrl}`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
    </ImageList>
    </Container>)

  })}
  
  </>)
};