import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";
import LogoBar from "../LogoBar/LogoBar";
import { Sidebar, Menu } from "react-pro-sidebar";

const SideBar = () => {
  const [currentPage, setCurrentPage] = useState("edit-pictures");

  const capitalize = (s) => {
    const replaced = s.replace(/(-.)/g, (x) => " " + x[1]);
    return replaced.charAt(0).toUpperCase() + replaced.slice(1);
  };

  function pressButton(id) {
    document
      .getElementById(id)
      ?.setAttribute("class", styles["button-pressed"]);
  }

  function unpressButton(id) {
    document.getElementById(id)?.setAttribute("class", styles.button);
  }

  return (
    <Sidebar
      style={{
        height: "100vh",
        minWidth: "300px",
        backgroundColor: "rgb(180,180,180)",
        borderTop: "solid black 2px",
      }}
    >
      <Menu>
        <div className={styles.button}>
          <LogoBar />
        </div>
        {[
          "edit-pictures",
          "edit-series",
          "edit-journal",
          "edit-pages-descriptions",
        ].map((page) => (
          <Link to={`/${page}`} key={page}>
            <div
              id={page}
              className={styles.button}
              onClick={() => {
                unpressButton(currentPage);
                pressButton(page);
                setCurrentPage(page);
              }}
            >
              <div className={styles["side-bar-link"]}>{capitalize(page)}</div>
            </div>
          </Link>
        ))}
        <Link to={"/login"} key={"login"} reloadDocument>
          <div
            id={"logout"}
            className={styles.button}
            onClick={() => {
              localStorage.clear();
            }}
          >
            <div className={styles["side-bar-link"]}>
              {capitalize("logout")}
            </div>
          </div>
        </Link>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
