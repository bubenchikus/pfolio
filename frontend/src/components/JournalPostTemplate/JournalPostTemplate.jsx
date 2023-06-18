import universalStyles from "../UniversalStyles.module.scss";
import styles from "./JournalPostTemplate.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import emoji from "node-emoji";

const JournalPostTemplate = ({ postData }) => {
  return (
    <div className={universalStyles.blockContainer}>
      <div className={universalStyles.blockTitle}>{postData?.title}</div>
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
