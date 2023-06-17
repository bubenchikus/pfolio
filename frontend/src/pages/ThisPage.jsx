import React from "react";
import axios from "../axios";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";
import Container from "@mui/material/Container";

const ThisPage = () => {
  const [descriptionData, setDescription] = React.useState();

  React.useEffect(() => {
    axios
      .get("/pages-descriptions/this-page")
      .then((response) => {
        setDescription(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting page description!");
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <PageTitle pageTitle="This page" />
      <PageDescription descriptionData={descriptionData} />
    </Container>
  );
};

export default ThisPage;
