import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
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
} from "./pages";

import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/art" element={<Art />} />
          <Route path="/art/cg-paint-left" element={<CGPaintLeft />} />
          <Route path="/art/cg-paint-right" element={<CGPaintRight />} />
          <Route path="/art/cg-graph" element={<CGGraph />} />
          <Route path="/art/trad" element={<Trad />} />
          <Route path="/art/comics" element={<Comics />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
