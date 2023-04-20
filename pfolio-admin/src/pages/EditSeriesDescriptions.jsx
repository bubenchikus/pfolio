import React from 'react';
import axios from '../axios';

export const EditSeriesDescriptions = () => {

  React.useEffect(()=>{
    axios
    .get("all-series-descriptions")
    .then((response) => {})
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting all series descriptions!');
    });
  }, [])

  return (
  <>
  </>
  );

};