import React from 'react';
import axios from '../axios';
import { TableTemplate } from '../components/TableTemplate/TableTemplate';

export const EditImages = () => {

  const [data, setData] = React.useState();

    React.useEffect(()=>{
        axios
        .get("pictures/")
        .then((response) => {
          setData(response.data)})
        .catch((err) => {
          console.warn(err);
          alert('Error occured while getting all pictures!');
        });
      }, [])

  return (
  <>
    <TableTemplate tableData={data} />
  </>
  );

};