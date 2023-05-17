import React from "react";
import axios from "../../axios";
import styles from "./TableTemplate.module.scss";

import { TextEditor } from "./subComponents/TextEditor";
import { CropWindow } from "./subComponents/CropWindow";
import { Table } from "./subComponents/Table";
import { CreateNewRowButton } from "./subComponents/CreateNewRowButton";
import { Editor } from "./subComponents/Editor";

export const TableTemplate = ({ route }) => {
  const [headers] = React.useState({
    Authentication:
      "Bearer " + JSON.parse(sessionStorage.getItem("token")).token,
  });
  const [data, setData] = React.useState();
  const [currentRowInfo, setCurrentRowInfo] = React.useState({});
  const [requestBody, setRequestBody] = React.useState({});
  const [columnsTitles, setColumnsTitles] = React.useState([]);

  const [editorMode, setEditorMode] = React.useState("upload"); //or 'edit'
  const [editorIsOpen, setEditorIsOpen] = React.useState(false);
  const [textEditorIsOpen, setTextEditorIsOpen] = React.useState(false);
  const [cropperIsOpen, setCropperIsOpen] = React.useState(false);

  const inputFileRef = React.useRef(null);
  const cropperRef = React.useRef(null);
  const [croppedImage, setCroppedImage] = React.useState("");

  const [dataChanged, setDataChanged] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(route === "pictures" ? "all-pictures" : route, { headers: headers })
      .then((response) => {
        setData(response.data);
        setDataChanged(false);
      })
      .catch((err) => {
        console.warn(err);
        alert(`Error occured while getting ${route}!`);
      });
  }, [route, headers, dataChanged]);

  React.useEffect(() => {
    axios
      .get("columns", { headers: headers })
      .then((response) => {
        setColumnsTitles(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert(`Error occured while getting columns!`);
      });
  }, [headers]);

  const closeIconStyle = {
    borderRadius: 2,
    border: "solid black 1px",
    cursor: "pointer",
  };

  return (
    <div className={styles.tableWrapper}>
      {editorIsOpen ? (
        <Editor
          route={route}
          editorMode={editorMode}
          setEditorMode={setEditorMode}
          requestBody={requestBody}
          setRequestBody={setRequestBody}
          currentRowInfo={currentRowInfo}
          setCurrentRowInfo={setCurrentRowInfo}
          setEditorIsOpen={setEditorIsOpen}
          setTextEditorIsOpen={setTextEditorIsOpen}
          setCropperIsOpen={setCropperIsOpen}
          headers={headers}
          columnsTitles={columnsTitles}
          closeIconStyle={closeIconStyle}
          setDataChanged={setDataChanged}
        />
      ) : (
        <>
          {textEditorIsOpen ? (
            <TextEditor
              setEditorIsOpen={setEditorIsOpen}
              setTextEditorIsOpen={setTextEditorIsOpen}
              requestBody={requestBody}
              setRequestBody={setRequestBody}
              currentRowInfo={currentRowInfo}
              closeIconStyle={closeIconStyle}
            />
          ) : cropperIsOpen ? (
            <CropWindow
              cropperRef={cropperRef}
              setCropperIsOpen={setCropperIsOpen}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              currentRowInfo={currentRowInfo}
              requestBody={requestBody}
              setEditorIsOpen={setEditorIsOpen}
              setCurrentRowInfo={setCurrentRowInfo}
              setRequestBody={setRequestBody}
              setDataChanged={setDataChanged}
            />
          ) : (
            <></>
          )}
        </>
      )}
      {data || dataChanged ? (
        <Table
          data={data}
          setCurrentRowInfo={setCurrentRowInfo}
          setRequestBody={setRequestBody}
          setEditorMode={setEditorMode}
          setEditorIsOpen={setEditorIsOpen}
          route={route}
          columnsTitles={columnsTitles}
        />
      ) : (
        <></>
      )}
      <CreateNewRowButton
        route={route}
        inputFileRef={inputFileRef}
        setEditorIsOpen={setEditorIsOpen}
        currentRowInfo={currentRowInfo}
        requestBody={requestBody}
        headers={headers}
        setCropperIsOpen={setCropperIsOpen}
      />
    </div>
  );
};
