import universalStyles from "../UniversalStyles.module.scss";
import styles from "./JournalPostTemplate.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import emoji from "node-emoji";
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

      <ReactMarkdown
        className={universalStyles.blockText}
        components={{
          img: ({ node, ...props }) => (
            <img
              alt=""
              style={{
                maxHeight: "250px",
                maxWidth: "100%",
              }}
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
