import universalStyles from "./UniversalStyles.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const PageDescription = ({ descriptionData }) => {
  return (
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
      {descriptionData?.txt || ""}
    </ReactMarkdown>
  );
};

export default PageDescription;
