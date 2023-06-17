import { Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import EditImages from "./pages/EditImages";
import EditJournal from "./pages/EditJournal";
import EditPagesDescriptions from "./pages/EditPagesDescriptions";
import EditSeriesDescriptions from "./pages/EditSeriesDescriptions";
import Login from "./pages/Login";
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
