import React from 'react';
import axios from "../axios";
import { PageTitle } from '../components/PageTitle';

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
    <PageTitle pageTitle="Dev works"/>
    </>
    );

};