import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";
import { useParams } from "react-router-dom";

const SimplePage = ({ pageTitle }) => {
  const [descriptionData, setDescription] = useState({});

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/pages-descriptions/${id}`)
      .then((res) => {
        setDescription(res.data);
      })
      .catch(() => {
        console.error("Error occured while getting page description!");
      });
  }, [id]);

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <PageDescription descriptionData={descriptionData} />
    </>
  );
};

export default SimplePage;
