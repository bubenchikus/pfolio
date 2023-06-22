import styles from "../TableTemplate.module.scss";
import deleteFromTable from "./helpers/deleteFromTable";
import uploadToTable from "./helpers/uploadToTable";
import updateTable from "./helpers/updateTable";

const EditorButtonBox = ({
  route,
  headers,
  requestBody,
  editorMode,
  resetEditor,
  currentRowInfo,
  setEditorIsOpen,
  setCropperIsOpen,
  setDataChanged,
}) => {
  return (
    <div className={styles.editorButtonBox}>
      <div
        className={styles.submitButton}
        onClick={() => {
          if (editorMode === "upload" && route !== "pictures") {
            uploadToTable(
              route,
              requestBody,
              headers,
              setDataChanged,
              resetEditor
            );
          } else {
            updateTable(
              route,
              requestBody,
              currentRowInfo,
              headers,
              setDataChanged,
              resetEditor
            );
          }
        }}
      >
        Submit row
      </div>
      {editorMode === "edit" ? (
        <div
          className={styles.submitButton}
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this item?")) {
              deleteFromTable(route, currentRowInfo, headers, setDataChanged);
              resetEditor();
            }
          }}
        >
          Delete row
        </div>
      ) : (
        <></>
      )}
      {route === "pictures" ? (
        <div
          className={styles.submitButton}
          onClick={() => {
            setEditorIsOpen(false);
            setCropperIsOpen(true);
          }}
        >
          Edit preview
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditorButtonBox;
