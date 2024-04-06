import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import GalleryPage from "./pages/GalleryPage";
import SimplePage from "./pages/SimplePage";
import { useEffect, useState } from "react";
import { KeyboardDoubleArrowUp, LightModeSharp, Brightness3Sharp } from "@mui/icons-material";

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

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
      {
        isUpButtonActive ? (
          <div
            className="upButton"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <KeyboardDoubleArrowUp sx={{ fontSize: "60px" }} />
            <div>UP</div>
          </div >
        ) : null}

      <div
        className="togglerButton"
        onClick={() => { setIsDark(!isDark) }}
      >
        {isDark ? <LightModeSharp sx={{ fontSize: "50px" }} /> : <Brightness3Sharp sx={{ fontSize: "50px" }} />}

      </div>

      <Header isDark={isDark} />
      <Container maxWidth="lg">

        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />

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

          <Route path="/art/:category?/:id?" element={<GalleryPage />} />

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

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
