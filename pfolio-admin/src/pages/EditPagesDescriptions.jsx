import React from 'react';
import axios from '../axios';
import { TableTemplate } from '../components/TableTemplate/TableTemplate';

export const EditPagesDescriptions = () => {

  const [data, setData] = React.useState();

  React.useEffect(()=>{
    axios
    .get("pages-descriptions")
    .then((response) => {
      setData(response.data)
    })
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting all pages descriptions!');
    });
  }, [])

  return (
  <>
    <TableTemplate tableData={data} />
  </>
  );

};