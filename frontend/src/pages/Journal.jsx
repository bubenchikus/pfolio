import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";
import JournalPostTemplate from "../components/JournalPostTemplate/JournalPostTemplate";
import PostPage from "./PostPage";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";
import universalStyles from "../components/UniversalStyles.module.scss";
import { Link, useParams } from "react-router-dom";
import { journalCategories } from "../internalConstants";

const Journal = () => {
  let { category, id } = useParams();

  const [data, setData] = useState([]);
  const [descriptionData, setDescription] = useState({});

  const [lastPage, setLastPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(category);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/posts/${currentCategory}?page=1`)
      .then((res) => {
        setData(res?.data);
        if (res?.data) {
          setLastPage(2);
          document
            .getElementById(currentCategory)
            .setAttribute("class", universalStyles["button-pressed"]);
        }
      })
      .catch(() => {
        console.error("Error occured while getting Journal page description!");
      });
  }, [currentCategory]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios
        .get(`/posts/${currentCategory}?page=${lastPage}`)
        .then((res) => {
          setData((prevData) => [...prevData, ...res?.data]);
          setLastPage((prevLastPage) => prevLastPage + 1);
        })
        .catch(() => {
          console.error("Error occured while getting journal!");
        });
      setIsLoading(false);
    };

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight ||
        isLoading
      ) {
        return fetchData();
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, lastPage, currentCategory]);

  useEffect(() => {
    axios
      .get("/pages-descriptions/journal")
      .then((res) => {
        setDescription(res?.data);
      })
      .catch(() => {
        console.error("Error occured while getting Journal page description!");
      });
  }, []);

  return data ? (
    <>
      {id ? <PostPage /> : <></>}
      <PageTitle pageTitle="Action Journal" />
      <PageDescription descriptionData={descriptionData} />
      <div className={universalStyles["button-box"]}>
        {journalCategories.map((category) => (
          <Link
            to={`/journal/${category}`}
            key={category}
            id={category}
            className={universalStyles.button}
            onClick={() => {
              setCurrentCategory(category);
              document
                .getElementById(currentCategory)
                .setAttribute("class", universalStyles.button);
            }}
          >
            {category}
          </Link>
        ))}
      </div>
      {data && data.length > 0 ? (
        data?.map((post, index) => (
          <JournalPostTemplate
            key={index}
            postData={post}
            currentCategory={currentCategory}
            clickable={true}
          />
        ))
      ) : (
        <h2>No posts available for this category yet...</h2>
      )}
      <>{isLoading && <p>Loading...</p>}</>
    </>
  ) : (
    <></>
  );
};

export default Journal;
