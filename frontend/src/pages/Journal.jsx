import { useState, useEffect } from "react";
import axios from "../axios";
import JournalPostTemplate from "../components/JournalPostTemplate/JournalPostTemplate";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";
import universalStyles from "../components/UniversalStyles.module.scss";
import Pagination from "@mui/material/Pagination";

const Journal = () => {
  const [data, setData] = useState();
  const [descriptionData, setDescription] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    axios
      .get(`/posts/${currentCategory}`)
      .then((response) => {
        setData(response?.data);
      })
      .catch((err) => {
        alert("Error occured while getting journal!");
      });
  }, [currentCategory]);

  useEffect(() => {
    axios
      .get("/pages-descriptions/journal")
      .then((response) => {
        setDescription(response?.data);
      })
      .catch((err) => {
        alert("Error occured while getting Journal page description!");
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
        {["all", "dev", "art", "comics", "misc"].map((category) => (
          <div
            key={category}
            id={category}
            className={
              category === "all"
                ? universalStyles.buttonPressed
                : universalStyles.button
            }
            onClick={() => {
              setCurrentCategory(category);
              setCurrentPage(1);
              pressButton(category);
              unpressButton(currentCategory);
            }}
          >
            {category}
          </div>
        ))}
      </div>
      {data ? (
        data[currentPage - 1]?.map((post) => (
          <JournalPostTemplate postData={post} />
        ))
      ) : (
        <></>
      )}
      <div className={universalStyles.paginationBox}>
        <Pagination
          count={data?.length}
          onChange={(_, page) => {
            setCurrentPage(page);
            window.scrollTo(0, 0);
          }}
          variant="outlined"
          shape="rounded"
          sx={{ margin: "20px 0", color: "rgb(148, 205, 171)" }}
        />
      </div>
    </>
  );
};

export default Journal;
