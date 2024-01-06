import { useState, useEffect } from "react";
import axios from "../axios";
import JournalPostTemplate from "../components/JournalPostTemplate/JournalPostTemplate";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";
import universalStyles from "../components/UniversalStyles.module.scss";
import { Link, useParams } from "react-router-dom";

const Journal = () => {
  let { category } = useParams();
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
      })
      .catch((err) => {
        console.error("Error occured while getting Journal page description!");
      });
    setLastPage(2);
    pressButton(currentCategory);
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
        .catch((err) => {
          console.error("Error occured while getting journal!");
        });
      setIsLoading(false);
    };

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading
      ) {
        localStorage.removeItem("yOffset");
        return;
      }
      fetchData();
    };
    window.addEventListener("scroll", handleScroll);

    if (localStorage.getItem("yOffset")) {
      window.scrollTo(0, parseInt(localStorage.getItem("yOffset")));
    }

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
      .catch((err) => {
        console.error("Error occured while getting Journal page description!");
      });
  }, []);

  function pressButton(id) {
    document
      .getElementById(id)
      ?.setAttribute("class", universalStyles.buttonPressed);
  }

  function unpressButton(id) {
    document.getElementById(id)?.setAttribute("class", universalStyles.button);
  }

  return (
    <>
      <PageTitle pageTitle="Action Journal" />
      <PageDescription descriptionData={descriptionData} />
      <div className={universalStyles.buttonBox}>
        {["all", "dev", "art", "stories", "misc"].map((category) => (
          <Link
            to={`/journal/${category}`}
            key={category}
            id={category}
            className={universalStyles.button}
            onClick={() => {
              setCurrentCategory(category);
              unpressButton(currentCategory);
            }}
          >
            {category}
          </Link>
        ))}
      </div>
      {data && data.length > 0 ? (
        data?.map((post) => (
          <JournalPostTemplate
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
  );
};

export default Journal;
