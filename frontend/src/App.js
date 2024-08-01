import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import { useEffect, useState, useMemo } from "react";
import {
  KeyboardDoubleArrowUp,
  LightModeSharp,
  Brightness3Sharp,
} from "@mui/icons-material";
import { Gallery, Home, Journal, Article } from "./pages";
import createPersistedState from "use-persisted-state";
import { artCategories } from "./internalConstants";

function App() {
  const useColorSchemeState = createPersistedState("colorScheme");
  const [isLight, setIsLight] = useColorSchemeState(true);

  const value = useMemo(() => isLight, [isLight]);

  useEffect(() => {
    if (value) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
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
          className="up-button"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <KeyboardDoubleArrowUp sx={{ fontSize: "60px" }} />
          <div>UP</div>
        </div>
      ) : null}

      <div
        className="toggler-button"
        onClick={() => {
          setIsLight(!isLight);
        }}
      >
        {isLight ? (
          <LightModeSharp sx={{ fontSize: "50px" }} />
        ) : (
          <Brightness3Sharp sx={{ fontSize: "50px" }} />
        )}
      </div>

      <Header isLight={isLight} />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home isLight={isLight} />} />

          {artCategories.map((category) => (
            <Route
              key={category}
              path={`/art/${category}/:id?`}
              element={<Gallery category={category} />}
            />
          ))}


          <Route path={`/journal/:category/:id?`} element={<Journal />} />


          <Route
            path="/article/lore"
            element={<Article pageTitle="lore" />}
          />
          <Route
            path="/article/admin-screenshots"
            element={
              <Article
                pageTitle="admin-screenshots"
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
