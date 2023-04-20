import React from 'react';
import axios from "../axios";
import { PageTitle } from '../components/PageTitle';
import { PageDescription } from '../components/PageDescription'

export const Art = () => {

  const [descriptionData, setDescription] = React.useState();

  React.useEffect(()=>{
      axios
      .get("/pages-descriptions/art")
      .then((response) => {
        setDescription(response.data)})
      .catch((err) => {
        console.warn(err);
        alert('Error occured while getting Art page description!');
      });
    }, [])

  return (
  <>
  <PageTitle pageTitle="Art works"/>
  <PageDescription descriptionData={descriptionData}/>
  </>
  );

};