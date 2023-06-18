import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import logo from "./../../uiPictures/logo-web.svg";

const Header = () => {
  return (
    <div className={styles.root}>
      <Link className={styles.logoBox} to="/">
        <img className={styles.imageLogo} src={logo} alt="Not found" />
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
