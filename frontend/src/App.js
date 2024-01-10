import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import GalleryPage from "./pages/GalleryPage";
import SimplePage from "./pages/SimplePage";
import { useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isUpButtonActive, setIsUpButtonActive] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    if (position > 200) {
      setIsUpButtonActive(true);
    } else {
      setIsUpButtonActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const iconStyle = {
    color: "black",
    fontSize: "60px",
    padding: 0,
    margin: 0,
  };

  return (
    <>
      {isUpButtonActive ? (
        <div
          className="upButton"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <KeyboardDoubleArrowUpIcon sx={iconStyle} />
          <div>UP</div>
        </div>
      ) : null}

      <Container>
        <Header />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/dev"
              element={<SimplePage pagePath="dev" pageTitle="Dev works" />}
            />
            <Route
              path="/this-page"
              element={
                <SimplePage pagePath="this-page" pageTitle="This page" />
              }
            />
            <Route
              path="/art"
              element={<SimplePage pagePath="art" pageTitle="Art works" />}
            />
            <Route
              path="/about"
              element={
                <SimplePage pagePath="about" pageTitle="About+contacts" />
              }
            />

            <Route
              path="/art/:category?/:id?"
              element={<GalleryPage pageTitle="Gallery" />}
            />

            <Route path="/journal/:category?/:id?" element={<Journal />} />

            <Route
              path="/admin-screenshots"
              element={
                <SimplePage
                  pagePath="admin-screenshots"
                  pageTitle="Admin panel screenshots"
                />
              }
            />

            {/* <Route path="/journal/:category/:id" element={<PostPage />}></Route> */}

            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </div>
      </Container>
    </>
  );
}

export default App;
