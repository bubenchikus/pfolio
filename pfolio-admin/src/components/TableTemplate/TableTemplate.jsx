import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import styles from "./TableTemplate.module.scss";
import axios from "../../axios";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const TableTemplate = ({ route }) => {
  const [data, setData] = React.useState();
  const headers = {
    Authentication:
      "Bearer " + JSON.parse(sessionStorage.getItem("token")).token,
  };
  const inputFileRef = React.useRef(null);
  const [editorIsOpen, setEditorIsOpen] = React.useState(false);
  const [textEditorIsOpen, setTextEditorIsOpen] = React.useState(false);
  const [editorMode, setEditorMode] = React.useState("upload"); //or 'edit'
  const [currentRowInfo, setCurrentRowInfo] = React.useState({});
  const [requestBody, setRequestBody] = React.useState({});
  const [columnsTitles, setColumnsTitles] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(route)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert(`Error occured while getting ${route}!`);
      });
  }, [route]);

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
  }, []);

  async function reloadPage() {
    axios
      .get(route)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert(`Error occured while getting ${route}!`);
      });
  }

  function resetEditor() {
    setEditorMode("upload");
    setCurrentRowInfo({});
    setRequestBody({});
    setEditorIsOpen(false);
  }

  var columns = [];

  if (data && data.length > 0 && route === "pictures") {
    columns = [
      {
        field: "preview",
        flex: 1,
        renderCell: (params) => {
          return (
            <>
              <Avatar
                src={`http://localhost:4444/pictures/${params.row.category}/${params.row.pictureName}`}
                variant="square"
                alt="Source unavailable!"
              />
            </>
          );
        },
      },
    ];
  }

  columnsTitles[route]?.forEach((el) => {
    var flex = 1;
    if (["id", "redraw"].includes(el)) {
      flex = 0.5;
    }
    if (["about", "txt"].includes(el)) {
      flex = 2.5;
    }
    columns.push({ field: el, flex: flex });
  });

  async function uploadToTable() {
    try {
      await axios.post(`${route}`, requestBody, { headers: headers });
      reloadPage();
    } catch (err) {
      console.warn(err);
      alert("Something went wrong while uploading!");
    }
  }

  async function uploadImageToTable(event) {
    try {
      var formData = new FormData();
      const file = event.target.files[0];

      formData.append("image", file);

      currentRowInfo.category =
        requestBody.category =
        requestBody.oldCategory =
          "no-category";
      currentRowInfo.pictureName =
        requestBody.pictureName =
        requestBody.oldPictureName =
          file.name;

      await axios.post("/upload", formData, { headers: headers });

      const res = await axios.post("pictures", requestBody, {
        headers: headers,
      });

      currentRowInfo.id = res.data[0].id;

      setEditorIsOpen(true);
    } catch (err) {
      console.warn(err);
      alert("Error occured while uploading file!");
    }
  }

  async function updateTable() {
    try {
      if (route === "pictures") {
        requestBody.oldCategory = currentRowInfo.category;
        requestBody.oldPictureName = currentRowInfo.pictureName;
      }
      await axios.patch(`${route}/${currentRowInfo.id}`, requestBody, {
        headers: headers,
      });

      reloadPage();
    } catch (err) {
      console.warn(err);
      alert("Something went wrong while uploading!");
    }
  }

  async function deleteFromTable() {
    try {
      await axios.delete(`${route}/${currentRowInfo.id}`, { headers: headers });
      setData(data?.filter((row) => row.id !== currentRowInfo.id));
      reloadPage();
    } catch (err) {
      console.warn(err);
      alert("Something went wrong while deleting!");
    }
  }

  const formStyle = { color: "black", borderColor: "black" };

  function returnJsxFormElement(el) {
    if (el === "category") {
      var defaultCategory = "no-category";
      var categories = columnsTitles["pictures-categories"];

      if (route === "posts") {
        defaultCategory = "misc";
        categories = ["misc", "dev", "art", "comics"];
      }

      if (editorMode === "upload" && !requestBody["category"]) {
        setRequestBody((prev) => ({ ...prev, category: defaultCategory }));
      }

      return (
        <div className={styles.formBlock}>
          <div className={styles.formLabel}>category:</div>
          <Select
            size="small"
            sx={formStyle}
            defaultValue={
              currentRowInfo.category
                ? currentRowInfo.category
                : defaultCategory
            }
            key={el}
            onChange={(e) =>
              setRequestBody((prev) => ({
                ...prev,
                [el]: e.target.value,
              }))
            }
          >
            {categories.map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </div>
      );
    } else if (el === "txt") {
      return (
        <div className={styles.formBlock}>
          <div className={styles.formLabel}>{`${el}:`}</div>
          <Button
            sx={formStyle}
            variant="outlined"
            key={el}
            onClick={() => {
              setEditorIsOpen(false);
              setTextEditorIsOpen(true);
            }}
          >
            Open text editor
          </Button>
        </div>
      );
    }
    return (
      <div className={styles.formBlock}>
        <div className={styles.formLabel}>{`${el}:`}</div>
        <TextField
          size="small"
          sx={formStyle}
          defaultValue={
            requestBody[el]
              ? requestBody[el]
              : currentRowInfo[el]
              ? currentRowInfo[el]
              : ""
          }
          key={el}
          inputProps={route === "pictures" ? { maxLength: 255 } : {}}
          onChange={(e) => {
            setRequestBody((prev) => ({ ...prev, [el]: e.target.value }));
          }}
        ></TextField>
      </div>
    );
  }

  const closeIconStyle = {
    borderRadius: 2,
    border: "solid black 1px",
    cursor: "pointer",
  };

  return (
    <div className={styles.tableWrapper}>
      {editorIsOpen ? (
        <div className={styles.uploaderEditorBox} id="uploaderEditorBox">
          <div className={styles.closeIconWrapper}>
            <CloseIcon
              onClick={() => {
                resetEditor();
                if (editorMode === "upload" && route === "pictures") {
                  deleteFromTable();
                }
              }}
              sx={closeIconStyle}
            />
          </div>
          {route === "pictures" ? (
            <img
              className={styles.picturePreview}
              src={`http://localhost:4444/pictures/${currentRowInfo.category}/${currentRowInfo.pictureName}`}
              alt="Preview"
            />
          ) : (
            <></>
          )}
          <div className={styles.formWrapper}>
            {columnsTitles[route]
              .filter((el) => !["id", "modified"].includes(el))
              .map((el) => returnJsxFormElement(el))}
            <div className={styles.editorButtonBox}>
              <div
                className={styles.submitButton}
                onClick={() => {
                  if (route === "pictures" && !requestBody.pictureName) {
                    alert("Picture name should not be empty!!!");
                  } else {
                    if (editorMode === "upload" && route !== "pictures") {
                      uploadToTable();
                    } else {
                      updateTable();
                    }
                    resetEditor();
                    reloadPage();
                  }
                }}
              >
                Submit row
              </div>
              {editorMode === "edit" ? (
                <div
                  className={styles.submitButton}
                  onClick={() => {
                    deleteFromTable();
                    resetEditor();
                    reloadPage();
                  }}
                >
                  Delete row
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {textEditorIsOpen ? (
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
                value={currentRowInfo.txt ? currentRowInfo.txt : ""}
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
                  setCurrentRowInfo((prev) => ({
                    ...prev,
                    txt: requestBody.txt,
                  }));
                  setTextEditorIsOpen(false);
                  setEditorIsOpen(true);
                }}
              >
                Submit text
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      {data ? (
        <>
          <Box sx={{ height: "800px", width: "100%" }}>
            <DataGrid
              initialState={{
                sorting: { sortModel: [{ field: "id", sort: "desc" }] },
              }}
              sx={{ width: "100%", cursor: "pointer", zIndex: "0" }}
              columns={columns}
              rows={data}
              disableRowSelectionOnClick
              onRowClick={(rowInfo) => {
                setCurrentRowInfo(rowInfo.row);
                setRequestBody(rowInfo.row);
                setEditorMode("edit");
                setEditorIsOpen(true);
              }}
            />
          </Box>
        </>
      ) : (
        <></>
      )}
      <div className={styles.buttonBox}>
        <div
          className={styles.button}
          onClick={() => {
            route === "pictures"
              ? inputFileRef.current.click()
              : setEditorIsOpen(true);
          }}
        >
          Create new row
        </div>
        <input
          ref={inputFileRef}
          type="file"
          onChange={uploadImageToTable}
          hidden
        />
      </div>
    </div>
  );
};
