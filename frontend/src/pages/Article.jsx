import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";

const Article = ({ pageTitle }) => {
  const [descriptionData, setDescription] = useState({});

  useEffect(() => {
    axios
      .get(`/pages-descriptions/${pageTitle}`)
      .then((res) => {
        setDescription(res.data);
      })
      .catch(() => {
        console.error("Error occured while getting page description!");
      });
  }, [pageTitle]);

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <PageDescription descriptionData={descriptionData} />
    </>
  );
};

export default Article;
