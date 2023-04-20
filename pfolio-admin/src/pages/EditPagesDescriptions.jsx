import React from 'react';
import axios from '../axios';

export const EditPagesDescriptions = () => {

  React.useEffect(()=>{
    axios
    .get("all-pages-descriptions")
    .then((response) => {})
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting all pages descriptions!');
    });
  }, [])

  return (
  <>
  </>
  );

};