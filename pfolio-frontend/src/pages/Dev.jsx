import React from 'react';
import axios from "../axios";

export const Dev = () => {

    React.useEffect(()=>{
        axios
        .get("dev")
        .catch((err) => {
          console.warn(err);
          alert('Error occured while getting Dev page!');
        });
      })

    return (
    <>
    </>
    );

};