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
    <div className={universalStyles.blockContainer}>
      {clickable ? (
        <Link
          to={`/journal/${currentCategory}/${postData?.id}`}
          className={universalStyles.blockTitle}
          onClick={() => {
            document.body.style.overflow = "hidden";
          }}
          id={`#${postData?.id}`}
        >
          {postData?.title}
        </Link>
      ) : (
        <div className={universalStyles.blockTitle}>{postData?.title}</div>
      )}

      <Markdown className={universalStyles.blockText}>{postData?.txt}</Markdown>
      <div className={styles.footer}>
        <div className={styles.footerComponent}>
          <b>Created:</b> {postData?.created?.substring(0, 10)}
        </div>
        <div className={styles.footerComponent}>
          <b>Category:</b> {postData?.category}
        </div>
      </div>
    </div>
  );
};

export default JournalPostTemplate;
