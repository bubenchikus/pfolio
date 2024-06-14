import React from "react";
import styles from "./MainMenu.module.scss";

import { Link } from "react-router-dom";

const MainMenu = ({ isDark }) => {
  return (
    <>
      <div className={styles.grid}>
        <div
          className={
            isDark ? styles["middle-block-dark"] : styles["middle-block-light"]
          }
        />
        <div className={styles["menu-block"]}>
          <Link to="/article/lore" className={styles["block-subblock"]}>
            <div className={styles["block-subblock-lore-image"]}></div>
            <div className={styles["block-subblock-text"]}>Lore</div>
          </Link>

          <Link to="/art/cg-paint-right" className={styles["block-subblock"]}>
            <div className={styles["block-subblock-art-cg-paint-right"]}></div>
            <div className={styles["block-subblock-text"]}>CG Paintings R</div>
          </Link>

          <Link to="/art/cg-paint-left" className={styles["block-subblock"]}>
            <div className={styles["block-subblock-art-cg-paint-left"]}></div>
            <div className={styles["block-subblock-text"]}>CG Paintings L</div>
          </Link>

          <Link to="/art/cg-graph" className={styles["block-subblock"]}>
            <div className={styles["block-subblock-art-cg-graph"]}></div>
            <div className={styles["block-subblock-text"]}>CG Graphics</div>
          </Link>

          <Link to="/art/stories" className={styles["block-subblock"]}>
            <div className={styles["block-subblock-art-stories"]}></div>
            <div className={styles["block-subblock-text"]}>
              Stories materials
            </div>
          </Link>

          <Link to="/art/trad-graph" className={styles["block-subblock"]}>
            <div className={styles["block-subblock-art-trad-graph"]}></div>
            <div className={styles["block-subblock-text"]}>Trad Graph</div>
          </Link>

          <Link to="/art/trad-paint" className={styles["block-subblock"]}>
            <div className={styles["block-subblock-art-trad-paint"]}></div>
            <div className={styles["block-subblock-text"]}>Trad Paint</div>
          </Link>
        </div>
      </div>
      <div className={styles["link-box"]}>
        <Link to="/journal/all" className={styles["huge-link"]}>
          Action journal
        </Link>
      </div>
    </>
  );
};

export default MainMenu;
