import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import { useEffect, useState, useMemo } from "react";
import {
  KeyboardDoubleArrowUp,
  LightModeSharp,
  Brightness3Sharp,
} from "@mui/icons-material";
import { GalleryPage, Home, Journal, SimplePage } from "./pages";
import createPersistedState from "use-persisted-state";
import { artCategories, journalCategories } from "./internalConstants";

function App() {
  const useColorSchemeState = createPersistedState("colorScheme");
  const [isDark, setIsDark] = useColorSchemeState(true);

  const value = useMemo(() => isDark, [isDark]);

  useEffect(() => {
    if (value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [value]);

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

  return (
    <>
      {isUpButtonActive ? (
        <div
          className="upButton"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <KeyboardDoubleArrowUp sx={{ fontSize: "60px" }} />
          <div>UP</div>
        </div>
      ) : null}

      <div
        className="togglerButton"
        onClick={() => {
          setIsDark(!isDark);
        }}
      >
        {isDark ? (
          <LightModeSharp sx={{ fontSize: "50px" }} />
        ) : (
          <Brightness3Sharp sx={{ fontSize: "50px" }} />
        )}
      </div>

      <Header isDark={isDark} />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />

          {artCategories.map((category) => (
            <Route
              path={`/art/${category}/:id?`}
              element={<GalleryPage category={category} />}
            />
          ))}


          <Route path={`/journal/:category/:id?`} element={<Journal />} />


          <Route
            path="/article/lore?"
            element={<SimplePage pageTitle="Lore" />}
          />
          <Route
            path="/article/admin-screenshots"
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
