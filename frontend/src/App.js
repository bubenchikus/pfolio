import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import GalleryPage from "./pages/GalleryPage";
import SimplePage from "./pages/SimplePage";

function App() {
  return (
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
            element={<SimplePage pagePath="this-page" pageTitle="This page" />}
          />
          <Route
            path="/art"
            element={<SimplePage pagePath="art" pageTitle="Art works" />}
          />
          <Route
            path="/about"
            element={<SimplePage pagePath="about" pageTitle="About+contacts" />}
          />

          <Route
            path="/art/cg-paint-right"
            element={
              <GalleryPage
                pageTitle="CG Paintings I"
                url="art/cg-paint-right"
              />
            }
          />
          <Route
            path="/art/cg-paint-left"
            element={
              <GalleryPage
                pageTitle="CG Paintings II"
                url="art/cg-paint-left"
              />
            }
          />
          <Route
            path="/art/cg-graph"
            element={<GalleryPage pageTitle="CG Graphics" url="art/cg-graph" />}
          />
          <Route
            path="/art/trad"
            element={<GalleryPage pageTitle="Traditional" url="art/trad" />}
          />
          <Route
            path="/art/stories"
            element={
              <GalleryPage pageTitle="Stories materials" url="art/stories" />
            }
          />

          <Route path="/journal" element={<Journal />} />

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
      </div>
    </Container>
  );
}

export default App;
