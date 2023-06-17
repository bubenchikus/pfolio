import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";
import LogoBar from "../LogoBar/LogoBar";
import { Sidebar, Menu } from "react-pro-sidebar";

const SideBar = () => {
  const [currentPage, setCurrentPage] = useState();

  const capitalize = (s) => {
    const replaced = s.replace(/(-.)/g, (x) => " " + x[1]);
    return replaced.charAt(0).toUpperCase() + replaced.slice(1);
  };

  function pressButton(id) {
    document.getElementById(id)?.setAttribute("class", styles.buttonPressed);
  }

  function unpressButton(id) {
    document.getElementById(id)?.setAttribute("class", styles.button);
  }

  return (
    <Sidebar
      style={{
        height: "100vh",
        minWidth: "400px",
        backgroundColor: "rgb(180,180,180)",
        borderTop: "solid black 2px",
      }}
    >
      <Menu>
        <div className={styles.button}>
          <LogoBar />
        </div>
        {[
          "edit-images",
          "edit-series",
          "edit-journal",
          "edit-pages-descriptions",
        ].map((page) => {
          return (
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
                <div className={styles.sideBarLink}>{capitalize(page)}</div>
              </div>
            </Link>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
