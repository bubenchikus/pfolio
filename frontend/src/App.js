import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dev from "./pages/Dev";
import Art from "./pages/Art";
import CGPaintLeft from "./pages/CGPaintLeft";
import CGPaintRight from "./pages/CGPaintRight";
import CGGraph from "./pages/CGGraph";
import Trad from "./pages/Trad";
import Comics from "./pages/Comics";
import About from "./pages/About";
import Journal from "./pages/Journal";
import ThisPage from "./pages/ThisPage";

import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/art" element={<Art />} />
          <Route path="/this-page" element={<ThisPage />} />
          <Route path="/art/cg-paint-left" element={<CGPaintLeft />} />
          <Route path="/art/cg-paint-right" element={<CGPaintRight />} />
          <Route path="/art/cg-graph" element={<CGGraph />} />
          <Route path="/art/trad" element={<Trad />} />
          <Route path="/art/comics" element={<Comics />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
