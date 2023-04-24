import React from 'react';
import axios from '../axios';

export const EditJournal = () => {

  React.useEffect(()=>{
    axios
    .get("posts")
    .then((response) => {})
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting journal posts!');
    });
  }, [])

  return (
  <>
  </>
  );

};