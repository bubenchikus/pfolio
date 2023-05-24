import React from "react";
import Container from "@mui/material/Container";
import universalStyles from "./UniversalStyles.module.scss";

export const PageTitle = ({ pageTitle }) => {
  return (
    <>
      <Container>
        <h2 className={universalStyles.pageTitle}>{pageTitle}</h2>
      </Container>
    </>
  );
};
