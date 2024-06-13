import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import logoLight from "./../../uiPictures/logo-web-light.svg";
import logoDark from "./../../uiPictures/logo-web-dark.svg";

const Header = ({ isDark }) => {
  return (
    <div className={styles.root}>
      <Link className={styles.logoBox} to="/">
        <img
          className={styles.imageLogo}
          src={isDark ? logoDark : logoLight}
          alt="Not found"
        />
        <h1 className={styles.textLogo}>
          Bubengogh's
          <br />
          bunker
        </h1>
      </Link>
    </div>
  );
};

export default Header;
