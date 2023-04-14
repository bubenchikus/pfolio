import React from 'react';
import axios from "../axios";

export const About = () => {

    React.useEffect(()=>{
        axios
        .get("about")
        .catch((err) => {
          console.warn(err);
          alert('Error occured while getting images!');
        });
      })

    return (
    <>
    </>
    );

};