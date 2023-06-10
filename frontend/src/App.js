import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Dev,
  Art,
  CGPaintLeft,
  CGPaintRight,
  CGGraph,
  Trad,
  Comics,
  About,
  Journal,
  ThisPage,
} from "./pages";

import { Header } from "./components/Header/Header";

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
