import React from 'react';
import axios from "../axios";

import { JournalPostTemplate } from '../components/JournalPostTemplate';

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
   {data?.map((post, index)=> {
    return (
    <div>
      <JournalPostTemplate postData={post}/>
    </div>
   )}
   )}
  </>
  );

};