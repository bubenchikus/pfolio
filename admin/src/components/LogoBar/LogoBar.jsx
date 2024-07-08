import logo from "../../uiPictures/logo-web.svg";
import styles from "./LogoBar.module.scss";

const LogoBar = () => {
  return (
    <div className={styles["logo-box"]}>
      <img className={styles["image-logo"]} src={logo} alt="Not found" />
      <div className={styles["test-logo"]}>Admin panel</div>
    </div>
  );
};

export default LogoBar;
