import React from "react";

import styles from "./MainMenu.module.scss";
import universalStyles from "../UniversalStyles.module.scss";

import { Link } from "react-router-dom";

import helloImage from "../../uiPictures/hello-image.webp";

export const MainMenu = () => {
  const placeholder = "In process...";

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.menuBlock}>
          <Link to="/dev" className={styles.pageSubtitle}>
            Dev works
          </Link>
          <Link to="/this-page" className={styles.blockSubblock}>
            <div className={styles.blockSubblockDev1Image}></div>
            <div className={styles.blockSubblockText}>This Page</div>
          </Link>
          <Link to="/" className={styles.blockSubblock}>
            <div className={styles.blockSubblockDev2Image}></div>
            <div className={styles.blockSubblockText}>{placeholder}</div>
          </Link>
        </div>
        <div className={styles.middleBlock}>
          <img className={styles.helloImage} src={helloImage} alt="Not found" />
        </div>
        <div className={styles.menuBlock}>
          <Link to="/art" className={styles.pageSubtitle}>
            Art works
          </Link>

          <Link to="/art/cg-paint-right" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt2Image}></div>
            <div className={styles.blockSubblockText}>CG Paintings I</div>
          </Link>

          <Link to="/art/cg-paint-left" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt1Image}></div>
            <div className={styles.blockSubblockText}>CG Paintings II</div>
          </Link>

          <Link to="/art/cg-graph" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt3Image}></div>
            <div className={styles.blockSubblockText}>CG Graphics</div>
          </Link>

          <Link to="/art/trad" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt4Image}></div>
            <div className={styles.blockSubblockText}>Traditional</div>
          </Link>

          <Link to="/art/comics" className={styles.blockSubblock}>
            <div className={styles.blockSubblockArt5Image}></div>
            <div className={styles.blockSubblockText}>Stories materials</div>
          </Link>
        </div>
      </div>
      <div className={universalStyles.linkBox}>
        <Link to="/about" className={universalStyles.link}>
          About+contacts
        </Link>
        <Link to="/journal" className={universalStyles.link}>
          Action journal
        </Link>
      </div>
    </>
  );
};
