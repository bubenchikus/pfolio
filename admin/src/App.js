import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import {
  EditImages,
  EditJournal,
  EditPagesDescriptions,
  EditSeriesDescriptions,
  Login,
} from "./pages";
import useToken from "./useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <Routes>
          <Route exact path="/edit-images" element={<EditImages />} />
          <Route path="/edit-journal" element={<EditJournal />} />
          <Route
            path="/edit-pages-descriptions"
            element={<EditPagesDescriptions />}
          />
          <Route path="/edit-series" element={<EditSeriesDescriptions />} />
          <Route path="*" element={<Navigate to={"/edit-images"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
