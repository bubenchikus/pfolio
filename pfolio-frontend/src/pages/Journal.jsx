import React from 'react';
import axios from "../axios";

import { JournalPostTemplate } from '../components/JournalPostTemplate';
import {PageTitle} from '../components/PageTitle'

export const Journal = () => {

  const [data, setData] = React.useState();

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


  return (
  <>
  <PageTitle pageTitle="Action Journal"/>
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