import React from "react";
import universalStyles from "./UniversalStyles.module.scss";
import Markdown from "react-markdown";

const PageDescription = ({ descriptionData }) => {
  return (
    <Markdown load="lazy" className={universalStyles["page-description"]}>
      {descriptionData?.txt || ""}
    </Markdown>
  );
};

export default PageDescription;
