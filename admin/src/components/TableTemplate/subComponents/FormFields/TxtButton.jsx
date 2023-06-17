import Button from "@mui/material/Button";
import styles from "../../TableTemplate.module.scss";

const TxtButton = ({ formStyle, setTextEditorIsOpen, setEditorIsOpen }) => {
  return (
    <div className={styles.formBlock}>
      <div className={styles.formLabel}>txt:</div>
      <Button
        sx={formStyle}
        variant="outlined"
        key={"txt"}
        onClick={() => {
          setEditorIsOpen(false);
          setTextEditorIsOpen(true);
        }}
      >
        Open text editor
      </Button>
    </div>
  );
};

export default TxtButton;
