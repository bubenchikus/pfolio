import SimpleMDE from "react-simplemde-editor";
import CloseIcon from "@mui/icons-material/Close";
import "easymde/dist/easymde.min.css";
import styles from "../TableTemplate.module.scss";

export const TextEditor = ({
  setEditorIsOpen,
  setTextEditorIsOpen,
  requestBody,
  setRequestBody,
  currentRowInfo,
  closeIconStyle,
}) => {
  return (
    <div className={styles.textEditorBox}>
      <div className={styles.closeIconWrapper}>
        <CloseIcon
          onClick={() => {
            setTextEditorIsOpen(false);
            setEditorIsOpen(true);
          }}
          sx={closeIconStyle}
        />
      </div>
      <SimpleMDE
        value={
          requestBody.txt
            ? requestBody.txt
            : currentRowInfo.txt
            ? currentRowInfo.txt
            : ""
        }
        onChange={(e) => {
          setRequestBody((prev) => ({
            ...prev,
            txt: e,
          }));
        }}
      />
      <div
        className={styles.submitButton}
        onClick={() => {
          setTextEditorIsOpen(false);
          setEditorIsOpen(true);
        }}
      >
        Submit text
      </div>
    </div>
  );
};
