import universalStyles from "../UniversalStyles.module.scss";
import styles from "./JournalPostTemplate.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import emoji from "node-emoji";
import { Link } from "react-router-dom";

const JournalPostTemplate = ({ postData, currentCategory }) => {
  return (
    <div className={universalStyles.blockContainer}>
      <Link
        to={`/journal/${currentCategory}/${postData?.id}`}
        className={universalStyles.blockTitle}
      >
        {postData?.title}
      </Link>
      <ReactMarkdown
        className={universalStyles.blockText}
        components={{
          img: ({ node, ...props }) => (
            <img
              alt=""
              style={{ maxWidth: "100%", maxHeight: "400px" }}
              {...props}
            />
          ),
        }}
      >
        {emoji.emojify(postData?.txt)}
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
  );
};

export default JournalPostTemplate;
