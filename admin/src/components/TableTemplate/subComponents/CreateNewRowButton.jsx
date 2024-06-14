import styles from "../TableTemplate.module.scss";
import uploadImageToTable from "./helpers/uploadImageToTable";

const CreateNewRowButton = ({
  route,
  inputFileRef,
  setEditorIsOpen,
  currentRowInfo,
  requestBody,
  headers,
  setCropperIsOpen,
  resetEditor,
}) => {
  return (
    <div className={styles["button-box"]}>
      <div
        className={styles.button}
        onClick={(e) => {
          if (route === "pictures") {
            inputFileRef.current.click();
          } else setEditorIsOpen(true);
        }}
      >
        Create new row
      </div>
      <input
        ref={inputFileRef}
        type="file"
        onChange={(e) => {
          uploadImageToTable(
            e,
            currentRowInfo,
            requestBody,
            headers,
            setCropperIsOpen,
            resetEditor
          );
        }}
        hidden
      />
    </div>
  );
};

export default CreateNewRowButton;
