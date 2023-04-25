import React from 'react';
import axios from '../axios';
import { TableTemplate } from '../components/TableTemplate/TableTemplate';

export const EditSeriesDescriptions = () => {

  const [data, setData] = React.useState();

  React.useEffect(()=>{
    axios
    .get("series-descriptions")
    .then((response) => {
      setData(response.data)
    })
    .catch((err) => {
      console.warn(err);
      alert('Error occured while getting all series descriptions!');
    });
  }, [])

  console.log(data);

  return (
  <>
    <TableTemplate tableData={data} />
  </>
  );

};