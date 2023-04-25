import React from 'react';
import axios from '../axios';
import { TableTemplate } from '../components/TableTemplate/TableTemplate';

export const EditJournal = () => {

  const [data, setData] = React.useState();

  React.useEffect(()=>{
    axios
    .get("posts")
    .then((response) => {
      setData(response.data)
    })
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting journal posts!');
    });
  }, [])

  return (
  <>
    <TableTemplate tableData={data} />
  </>
  );

};