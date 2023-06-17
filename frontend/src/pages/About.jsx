import React from "react";
import axios from "../axios";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";

const About = () => {
  const [descriptionData, setDescription] = React.useState();

  React.useEffect(() => {
    axios
      .get("/pages-descriptions/about")
      .then((response) => {
        setDescription(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting About page description!");
      });
  }, []);

  return (
    <>
      <PageTitle pageTitle="About+contacts" />
      <PageDescription descriptionData={descriptionData} />
    </>
  );
};

export default About;
