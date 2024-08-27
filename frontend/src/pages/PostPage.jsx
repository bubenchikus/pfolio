import React from "react";
import { useEffect, useState, useLayoutEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JournalPostTemplate from "../components/JournalPostTemplate/JournalPostTemplate";
import axios from "../axios";
import universalStyles from "../components/UniversalStyles.module.scss";
import styles from "../components/JournalPostTemplate/JournalPostTemplate.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import styleConstants from "../styleConstants.scss";

const PostPage = () => {
  let { category, id } = useParams();
  const [postData, setPostData] = useState({});

  useEffect(() => {
    axios
      .get(`/posts/${category}/${id}`)
      .then((res) => {
        setPostData(
          res.data || {
            title: "Seems like post with this id does not exist...",
            txt: "(◉Θ◉)",
          }
        );
      })
      .catch(() => {
        console.error("Error occured while getting post!");
      });
  }, [category, id]);

  const [clientWidth, setClientWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      setClientWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const iconFontStyle = `${
    clientWidth > parseInt(styleConstants["mobile-width"])
      ? Math.floor(clientWidth / 30)
      : Math.floor(clientWidth / 10)
  }px`;

  const iconStyle = {
    color: "white",
    fontSize: iconFontStyle,
    padding: "10px",
    cursor: "pointer",
  };

  return (
    <div className={universalStyles.dark}>
      <div className={styles["close-box"]}>
        <Link to={`/journal/${category}`}>
          <CloseIcon sx={iconStyle} />
        </Link>
      </div>

      <div className={styles["post-box"]}>
        <JournalPostTemplate postData={postData} clickable={false} />
      </div>
    </div>
  );
};

export default PostPage;
