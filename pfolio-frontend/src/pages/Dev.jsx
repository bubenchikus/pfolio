import React from 'react';
import axios from "../axios";
import { PageTitle } from '../components/PageTitle';
import { PageDescription } from '../components/PageDescription';

export const Dev = () => {

  const [descriptionData, setDescription] = React.useState();

  React.useEffect(()=>{
      axios
      .get("dev")
      .then((response) => {
        setDescription(response.data)})
      .catch((err) => {
        console.warn(err);
        alert('Error occured while getting Dev page!');
      });
    })

  return (
  <>
  <PageTitle pageTitle="Dev works"/>
  <PageDescription descriptionData={descriptionData}/>
  </>
  );

};