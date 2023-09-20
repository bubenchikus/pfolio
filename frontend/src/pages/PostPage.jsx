import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import JournalPostTemplate from "../components/JournalPostTemplate/JournalPostTemplate";
import axios from "../axios";
import universalStyles from "../components/UniversalStyles.module.scss";

const PostPage = () => {
  let { category, id } = useParams();
  const [postData, setPostData] = useState({});

  useEffect(() => {
    axios
      .get(`/posts/${category}/${id}`)
      .then((res) => {
        setPostData(res.data[0]);
      })
      .catch((err) => {
        console.error("Error occured while getting post!");
      });
  }, [category, id]);

  console.log("POST data: ", postData);
  return (
    <>
      <JournalPostTemplate postData={postData} />
      <div className={universalStyles.buttonBox}>
        <Link className={universalStyles.button} to={`/journal/${category}`}>
          Back to journal
        </Link>
      </div>
    </>
  );
};

export default PostPage;
