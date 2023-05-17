import styles from "../TableTemplate.module.scss";
import { deleteFromTable } from "./helpers/deleteFromTable";
import { uploadToTable } from "./helpers/uploadToTable";
import { updateTable } from "./helpers/updateTable";

export const EditorButtonBox = ({
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
          if (route === "pictures" && requestBody.pictureName === "") {
            alert("Picture name should not be empty!!!");
          } else if (
            route === "posts" &&
            (!requestBody.title || requestBody.title === "" || !requestBody.txt)
          ) {
            alert("Post title and text should not be empty!!!");
          } else {
            if (editorMode === "upload" && route !== "pictures") {
              uploadToTable(route, requestBody, headers);
            } else {
              updateTable(
                route,
                requestBody,
                currentRowInfo,
                headers,
                setDataChanged
              );
            }
            resetEditor();
          }
        }}
      >
        Submit row
      </div>
      {editorMode === "edit" ? (
        <div
          className={styles.submitButton}
          onClick={() => {
            deleteFromTable(route, currentRowInfo, headers, setDataChanged);
            resetEditor();
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
