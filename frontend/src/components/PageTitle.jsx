import React from "react";
import universalStyles from "./UniversalStyles.module.scss";

const PageTitle = ({ pageTitle }) => {
  return (
    <h2 className={universalStyles["page-title"]}>
      {pageTitle?.replace(/-/g, " ") ??
        `${window.location.href
          .substring(window.location.href.lastIndexOf("/") + 1)
          .replace(/-/g, " ")}`}
    </h2>
  );
};

export default PageTitle;
