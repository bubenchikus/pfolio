import React from "react";
import styles from "./MainMenu.module.scss";
import universalStyles from "../UniversalStyles.module.scss";

import { Link } from "react-router-dom";

import helloImage from "../../uiPictures/hello-image.webp";
import helloImageDark from "../../uiPictures/hello-image-dark.webp";

const MainMenu = ({ isDark }) => {
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.menuBlock}>
          <div className={styles.pageSubtitle}>Stories</div>
          <Link to="/art/lore" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Lore</div>
          </Link>
          <Link to="/art/big-barn-book" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Big Barn Book</div>
          </Link>
          <Link to="/art/cast-iron-empire" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Cast Iron Empire</div>
          </Link>
          <Link to="/art/moonwalker-1" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Moonwalker-1</div>
          </Link>
          <Link
            to="/art/numerology-plant-number"
            className={styles.blockSubblock}
          >
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Numerology Plant #</div>
          </Link>
          <Link to="/art/catalogues" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Catalogues</div>
          </Link>
          <Link to="/art/stories" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Other materials</div>
          </Link>
        </div>
        <div className={styles.middleBlock}>
          <img
            className={styles.helloImage}
            src={isDark ? helloImageDark : helloImage}
            alt="Not found"
          />
        </div>
        <div className={styles.menuBlock}>
          <div className={styles.pageSubtitle}>Art works</div>

          <Link to="/art/cg-paint-right" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt2Image}></div>
            <div className={styles.blockSubblockText}>CG Paintings R</div>
          </Link>

          <Link to="/art/cg-paint-left" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt1Image}></div>
            <div className={styles.blockSubblockText}>CG Paintings L</div>
          </Link>

          <Link to="/art/cg-graph" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt3Image}></div>
            <div className={styles.blockSubblockText}>CG Graphics</div>
          </Link>

          <Link to="/art/trad-graph" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt4Image}></div>
            <div className={styles.blockSubblockText}>Trad Graph</div>
          </Link>

          <Link to="/art/trad-paint" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt4Image}></div>
            <div className={styles.blockSubblockText}>Trad Paint</div>
          </Link>
        </div>
      </div>
      <div className={universalStyles.linkBox}>
        <Link to="/journal/all" className={styles.hugeLink}>
          Action journal
        </Link>
      </div>
    </>
  );
};

export default MainMenu;
