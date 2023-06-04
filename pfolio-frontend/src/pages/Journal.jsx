import React from "react";
import axios from "../axios";
import { JournalPostTemplate } from "../components/JournalPostTemplate/JournalPostTemplate";
import { PageTitle } from "../components/PageTitle";
import { PageDescription } from "../components/PageDescription";
import universalStyles from "../components/UniversalStyles.module.scss";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";

export const Journal = () => {
  const [data, setData] = React.useState();
  const [descriptionData, setDescription] = React.useState();

  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentCategory, setCurrentCategory] = React.useState("all");

  React.useEffect(() => {
    axios
      .get("posts")
      .then((response) => {
        setData(
          response?.data.sort(function (a, b) {
            return new Date(b.created) - new Date(a.created);
          })
        );
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting journal!");
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("/pages-descriptions/journal")
      .then((response) => {
        setDescription(response?.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error occured while getting Journal page description!");
      });
  }, []);

  const categories = { all: data };
  data?.forEach((element) => {
    if (!categories.hasOwnProperty(element.category)) {
      categories[element.category] = [element];
    } else {
      categories[element.category].push(element);
    }
  });

  Object.keys(categories)?.forEach((category) => {
    let categoryIndex = 0;
    categories[category]?.forEach((el) => {
      el["categoryIndex"] = categoryIndex;
      categoryIndex++;
    });
  });

  let journalIndex = 0;
  categories["all"]?.forEach((el) => {
    el["journalIndex"] = journalIndex;
    journalIndex++;
  });

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
      <Container>
        <div className={universalStyles.buttonBox}>
          {Object.keys(categories).map((category) => (
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
      </Container>
      {currentCategory === "all"
        ? categories["all"]
          ? categories["all"]
              ?.filter(
                (el) =>
                  el.journalIndex >= (currentPage - 1) * postsPerPage &&
                  el.journalIndex < currentPage * postsPerPage
              )
              ?.map((post) => {
                return (
                  <div key={post.journalIndex}>
                    <JournalPostTemplate postData={post} />
                  </div>
                );
              })
          : []
        : categories[currentCategory]
        ? categories[currentCategory]
            ?.filter(
              (el) =>
                el.categoryIndex >= (currentPage - 1) * postsPerPage &&
                el.categoryIndex < currentPage * postsPerPage
            )
            ?.map((post) => {
              return (
                <div key={post.categoryIndex}>
                  <JournalPostTemplate postData={post} />
                </div>
              );
            })
        : []}
      <div className={universalStyles.paginationBox}>
        <Pagination
          count={Math.ceil(
            Object.keys(categories[currentCategory] || {}).length / postsPerPage
          )}
          onChange={(e, value) => setCurrentPage(value)}
          variant="outlined"
          shape="rounded"
          sx={{ margin: "20px 0", color: "rgb(148, 205, 171)" }}
        />
      </div>
    </>
  );
};
