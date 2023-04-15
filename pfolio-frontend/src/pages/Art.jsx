import React from 'react';
import axios from "../axios";
import { PageTitle } from '../components/PageTitle';

export const Art = () => {

    React.useEffect(()=>{
        axios
        .get("art")
        .catch((err) => {
          console.warn(err);
          alert('Error occured while getting Art page!');
        });
      })

    return (
    <>
    <PageTitle pageTitle="Art works"/>
    </>
    );

};