import React from 'react';
import axios from "../axios";

import { JournalPostTemplate } from '../components/JournalPostTemplate/JournalPostTemplate';
import {PageTitle} from '../components/PageTitle'
import { PageDescription } from '../components/PageDescription';

export const Journal = () => {

  const [data, setData] = React.useState();
  const [descriptionData, setDescription] = React.useState();

  React.useEffect(()=>{
      axios
      .get("journal")
      .then((response) => {
        setData(response?.data)})
      .catch((err) => {
        console.warn(err);
        alert('Error occured while getting journal!');
      });
    }, [])

    React.useEffect(()=>{
      axios
      .get("journal/description")
      .then((response) => {
        setDescription(response?.data)})
      .catch((err) => {
        console.warn(err);
        alert('Error occured while getting journal!');
      });
    }, [])


  return (
  <>
  <PageTitle pageTitle="Action Journal"/>
  <PageDescription descriptionData={descriptionData}/>
   {data?.map((post, index)=> {
    return (
    <div key={index}>
      <JournalPostTemplate postData={post}/>
    </div>
   )}
   )}
  </>
  );

};