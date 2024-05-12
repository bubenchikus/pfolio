import React from "react";
import universalStyles from "./UniversalStyles.module.scss";
import Markdown from "react-markdown";

const PageDescription = ({ descriptionData }) => {
  return (
    <Markdown className={universalStyles.pageDescription}>
      {descriptionData?.txt || ""}
    </Markdown>
  );
};

export default PageDescription;
