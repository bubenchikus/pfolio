import React from "react";
import Container from "@mui/material/Container";
import universalStyles from "./UniversalStyles.module.scss";

export const PageTitle = ({ pageTitle }) => {
  return (
    <>
      <Container>
        <div className={universalStyles.pageTitle}>{pageTitle}</div>
      </Container>
    </>
  );
};
