import { Routes, Route, Navigate } from "react-router-dom";
import useToken from "./useToken";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login";

import EditPage from "./pages/EditPage";

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
          <Route
            exact
            path="/edit-pictures"
            element={<EditPage route="pictures" />}
          />
          <Route
            exact
            path="/edit-journal"
            element={<EditPage route="posts" />}
          />
          <Route
            exact
            path="/edit-pages-descriptions"
            element={<EditPage route="pages-descriptions" />}
          />
          <Route
            exact
            path="/edit-series"
            element={<EditPage route="series-descriptions" />}
          />
          <Route path="*" element={<Navigate to={"/edit-pictures"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
