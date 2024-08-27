import React from "react";
import universalStyles from "../UniversalStyles.module.scss";
import styles from "./JournalPostTemplate.module.scss";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

const JournalPostTemplate = ({
  postData,
  currentCategory,
  clickable = false,
}) => {
  return (
    <div className={universalStyles["block-container"]}>
      {clickable ? (
        <Link
          to={`/journal/${currentCategory}/${postData?.id}`}
          className={universalStyles["block-title"]}
          id={`#${postData?.id}`}
        >
          {postData?.title}
        </Link>
      ) : (
        <div className={universalStyles["block-title"]}>{postData?.title}</div>
      )}

      <Markdown className={universalStyles["block-text"]}>
        {postData?.txt}
      </Markdown>
      <div className={styles.footer}>
        <div className={styles["footer-component"]}>
          <b>Created:</b> {postData?.created?.substring(0, 10)}
        </div>
        <div className={styles["footer-component"]}>
          <b>Category:</b> {postData?.category}
        </div>
      </div>
    </div>
  );
};

export default JournalPostTemplate;
