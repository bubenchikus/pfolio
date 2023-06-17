import logo from "../../uiPictures/logo-web.svg";
import styles from "./LogoBar.module.scss";

const LogoBar = () => {
  return (
    <div className={styles.logoBox}>
      <img className={styles.imageLogo} src={logo} alt="Not found" />
      <div className={styles.textLogo}>Admin panel</div>
    </div>
  );
};

export default LogoBar;
