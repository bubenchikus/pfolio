import React from "react";
import universalStyles from "./UniversalStyles.module.scss";
import Markdown from "react-markdown";

const PageDescription = ({ descriptionData }) => {
  return (
    <Markdown
      className={universalStyles.pageDescription}
      components={{
        img: ({ node, ...props }) => (
          <img
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
            }}
            {...props}
          />
        ),
      }}
    >
      {descriptionData?.txt || ""}
    </Markdown>
  );
};

export default PageDescription;
