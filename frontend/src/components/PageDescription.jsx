import React from "react";
import Container from "@mui/material/Container";
import universalStyles from "./UniversalStyles.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const PageDescription = ({ descriptionData }) => {
  return (
    <>
      <Container>
        <ReactMarkdown
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
          {descriptionData?.length > 0 && descriptionData[0].txt?.length > 0
            ? descriptionData[0].txt
            : "Description isn't added yet..."}
        </ReactMarkdown>
      </Container>
    </>
  );
};

export default PageDescription;
