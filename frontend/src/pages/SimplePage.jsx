import { useState, useEffect } from "react";
import axios from "../axios";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";

const SimplePage = ({ pagePath, pageTitle }) => {
  const [descriptionData, setDescription] = useState();

  useEffect(() => {
    axios
      .get(`/pages-descriptions/${pagePath}`)
      .then((response) => {
        setDescription(response.data);
      })
      .catch((err) => {
        alert("Error occured while getting page description!");
      });
  }, [pagePath]);

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <PageDescription descriptionData={descriptionData} />
    </>
  );
};

export default SimplePage;
