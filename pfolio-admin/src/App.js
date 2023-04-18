import React from "react";
import { Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";

import {
  EditImages,
  EditJournal,
  EditPagesDescriptions,
  EditSeriesDescriptions,
  UploadImages,
} from "./pages";

function App() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/upload-images" element={<UploadImages />} />
        <Route path="/edit-images" element={<EditImages />} />
        <Route path="/edit-journal" element={<EditJournal />} />
        <Route
          path="/edit-pages-descriptions"
          element={<EditPagesDescriptions />}
        />
        <Route
          path="/edit-series-descriptions"
          element={<EditSeriesDescriptions />}
        />
      </Routes>
    </>
  );
}

export default App;
