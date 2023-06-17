import React from "react";
import axios from "../axios";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";
import Container from "@mui/material/Container";

const Dev = () => {
  const [descriptionData, setDescription] = React.useState();

  React.useEffect(() => {
    axios
      .get("/pages-descriptions/dev")
      .then((response) => {
        setDescription(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting Dev page description!");
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <PageTitle pageTitle="Dev works" />
      <PageDescription descriptionData={descriptionData} />
    </Container>
  );
};

export default Dev;
