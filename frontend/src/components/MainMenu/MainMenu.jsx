import React from "react";
import styles from "./MainMenu.module.scss";
import universalStyles from "../UniversalStyles.module.scss";

import { Link } from "react-router-dom";

import helloImage from "../../uiPictures/hello-image.webp";

const MainMenu = () => {
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.menuBlock}>
          <div className={styles.pageSubtitle}>World building</div>
          {/* <Link to="/this-page" className={styles.blockSubblock}>
            <div className={styles.blockSubblockDev1Image}></div>
            <div className={styles.blockSubblockText}>This Page</div>
          </Link> */}
          <Link to="/art/stories" className={styles.blockSubblock}>
            {/* <div className={styles.blockSubblockArt5Image}></div> */}
            <div className={styles.blockSubblockText}>Lore</div>
          </Link>
          <Link to="/art/stories" className={styles.blockSubblock}>
            {/* <div className={styles.blockSubblockArt5Image}></div> */}
            <div className={styles.blockSubblockText}>Big Barn Book</div>
          </Link>
          <Link to="/art/stories" className={styles.blockSubblock}>
            {/* <div className={styles.blockSubblockArt5Image}></div> */}
            <div className={styles.blockSubblockText}>Cast Iron Empire</div>
          </Link>
          <Link to="/art/stories" className={styles.blockSubblock}>
            {/* <div className={styles.blockSubblockArt5Image}></div> */}
            <div className={styles.blockSubblockText}>Moonwalker-1</div>
          </Link>
          <Link to="/art/stories" className={styles.blockSubblock}>
            {/* <div className={styles.blockSubblockArt5Image}></div> */}
            <div className={styles.blockSubblockText}>Numerology Plant #</div>
          </Link>
          <Link to="/art/stories" className={styles.blockSubblock}>
            {/* <div className={styles.blockSubblockArt5Image}></div> */}
            <div className={styles.blockSubblockText}>Catalogues</div>
          </Link>
          <Link to="/art/stories" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Other materials</div>
          </Link>
        </div>
        <div className={styles.middleBlock}>
          <img className={styles.helloImage} src={helloImage} alt="Not found" />
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
            {/* <div className={styles.blockSubblockArt4Image}></div> */}
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
