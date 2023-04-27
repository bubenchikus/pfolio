import React from "react";
import Container from "@mui/material/Container";
import universalStyles from "../UniversalStyles.module.scss";
import styles from "./JournalPostTemplate.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const JournalPostTemplate = ({ postData }) => {
  return (
    <>
      <Container>
        <div className={universalStyles.blockContainer}>
          <div className={universalStyles.blockTitle}>{postData?.title}</div>
          <ReactMarkdown
            className={universalStyles.blockText}
            transformImageUri={(uri) =>
              uri.startsWith("http")
                ? uri
                : `${process.env.REACT_IMAGE_BASE_URL}${uri}`
            }
            components={{
              img: ({ node, ...props }) => (
                <img
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                  {...props}
                />
              ),
            }}
          >
            {postData?.txt}
          </ReactMarkdown>
          <div className={styles.footer}>
            <div className={styles.footerComponent}>
              <b>Created:</b> {postData?.created?.substring(0, 10)}
            </div>
            <div className={styles.footerComponent}>
              <b>Category:</b> {postData?.category}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
