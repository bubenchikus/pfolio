import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import logoLight from "./../../uiPictures/logo-web-light.svg";
import logoDark from "./../../uiPictures/logo-web-dark.svg";

const Header = ({ isLight }) => {
  return (
    <div className={styles.root}>
      <Link className={styles["logo-box"]} to="/">
        <img
          className={styles["image-logo"]}
          src={isLight ? logoLight : logoDark}
          alt="Not found"
        />
        <h1 className={styles["test-logo"]}>
          Bubengogh's
          <br />
          bunker
        </h1>
      </Link>
    </div>
  );
};

export default Header;
