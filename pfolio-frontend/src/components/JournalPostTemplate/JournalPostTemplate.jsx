import React from "react";
import Container from "@mui/material/Container";
import universalStyles from "../UniversalStyles.module.scss";
import styles from "./JournalPostTemplate.module.scss";

export const JournalPostTemplate = ({ postData }) => {
  return (
    <>
      <Container>
        <div className={universalStyles.blockContainer}>
          <div className={universalStyles.blockTitle}>{postData?.title}</div>
          <div className={universalStyles.blockText}>{postData?.txt}</div>
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
