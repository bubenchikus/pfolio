import styles from "../TableTemplate.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { deleteFromTable } from "./helpers/deleteFromTable";
import { FormComponent } from "./FormComponent";
import { EditorButtonBox } from "./EditorButtonBox";

export const Editor = ({
  route,
  editorMode,
  setEditorMode,
  requestBody,
  setRequestBody,
  currentRowInfo,
  setCurrentRowInfo,
  setEditorIsOpen,
  setTextEditorIsOpen,
  setCropperIsOpen,
  headers,
  columnsTitles,
  closeIconStyle,
  setDataChanged,
}) => {
  function resetEditor() {
    setEditorMode("upload");
    setCurrentRowInfo({});
    setRequestBody({});
    setEditorIsOpen(false);
  }
  return (
    <div className={styles.uploaderEditorBox} id="uploaderEditorBox">
      <div className={styles.closeIconWrapper}>
        <CloseIcon
          onClick={() => {
            resetEditor();
            if (editorMode === "upload" && route === "pictures") {
              deleteFromTable(route, currentRowInfo, headers, setDataChanged);
            }
          }}
          sx={closeIconStyle}
        />
      </div>
      {route === "pictures" ? (
        <img
          className={styles.picturePreview}
          src={`${process.env.REACT_APP_API_URL}/pictures/${currentRowInfo.category}/${currentRowInfo.pictureName}`}
          alt="Preview"
        />
      ) : (
        <></>
      )}
      <div className={styles.formWrapper}>
        {columnsTitles[route]
          .filter((el) => !["id", "modified"].includes(el))
          .map((el) => (
            <FormComponent
              el={el}
              currentRowInfo={currentRowInfo}
              setCurrentRowInfo={setCurrentRowInfo}
              requestBody={requestBody}
              setRequestBody={setRequestBody}
              columnsTitles={columnsTitles}
              route={route}
              editorMode={editorMode}
              setEditorIsOpen={setEditorIsOpen}
              setTextEditorIsOpen={setTextEditorIsOpen}
            />
          ))}
        <EditorButtonBox
          route={route}
          headers={headers}
          requestBody={requestBody}
          editorMode={editorMode}
          resetEditor={resetEditor}
          currentRowInfo={currentRowInfo}
          setEditorIsOpen={setEditorIsOpen}
          setCropperIsOpen={setCropperIsOpen}
          setDataChanged={setDataChanged}
        />
      </div>
    </div>
  );
};
