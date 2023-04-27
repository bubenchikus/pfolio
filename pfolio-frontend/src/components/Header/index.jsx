import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";

import logo from "./../../uiPictures/logo-web.svg";

export const Header = () => {
  return (
    <Container maxWidth="lg">
      <div className={styles.root}>
        <Link className={styles.logoBox} to="/">
          <img className={styles.imageLogo} src={logo} alt="Not found" />
          <div className={styles.textLogo}>
            <div>
              Bubengogh's
              <br />
              bunker
            </div>
          </div>
        </Link>
      </div>
    </Container>
  );
};
