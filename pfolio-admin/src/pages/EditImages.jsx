import React from 'react';
import axios from '../axios';

export const EditImages = () => {

  React.useEffect(()=>{
    axios
    .get("pictures")
    .then((response) => {})
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting all pictures!');
    });
  }, [])

  return (
  <>
  </>
  );

};