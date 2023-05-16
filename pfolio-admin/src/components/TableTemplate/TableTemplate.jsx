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
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getRandomString } from "../../utils/RandomString";

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
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;

    cropper
      .getCroppedCanvas({
        width: 350,
        height: 350,
      })
      .toBlob((blob) => {
        setCroppedImage(blob);
      });
  };

  React.useEffect(() => {
    axios
      .get(route === "pictures" ? "all-pictures" : route, { headers: headers })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.warn(err);
        alert(`Error occured while getting ${route}!`);
      });
  }, [route, headers]);

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

  async function reloadPage() {
    axios
      .get(route === "pictures" ? "all-pictures" : route, { headers: headers })
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
                src={
                  params.row.previewName
                    ? `${process.env.REACT_APP_API_URL}/pictures/previews/${params.row.previewName}.png`
                    : `${process.env.REACT_APP_API_URL}/pictures/${params.row.category}/${params.row.pictureName}`
                }
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
    if (["id", "redraw", "hide"].includes(el)) {
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
      currentRowInfo.previewName = requestBody.previewName = getRandomString();

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
      } else if (route === "series-descriptions") {
        requestBody.oldSeries = currentRowInfo.series;
      }
      await axios.patch(`${route}/${currentRowInfo.id}`, requestBody, {
        headers: headers,
      });

      reloadPage();
    } catch (err) {
      console.warn(err);
      alert("Something went wrong while updating table!");
    }
  }

  async function deleteFromTable() {
    try {
      await axios.delete(`${route}/${currentRowInfo.id}`, { headers: headers });
      reloadPage();
    } catch (err) {
      console.warn(err);
      alert("Something went wrong while deleting data from table!");
    }
  }

  async function postPreview(blob) {
    try {
      const formData = new FormData();

      const pictureName = currentRowInfo.previewName
        ? currentRowInfo.previewName
        : getRandomString();

      requestBody.previewName = currentRowInfo.previewName = pictureName;

      formData.append("image", blob, `${pictureName}.png`);

      await axios.post("/upload-preview", formData, {
        headers: {
          Authentication:
            "Bearer " + JSON.parse(sessionStorage.getItem("token")).token,
          enctype: "multipart/form-data",
        },
      });
    } catch (err) {
      console.warn(err);
      alert("Something went wrong while uploading preview!");
    }
  }

  const formStyle = { color: "black", borderColor: "black" };
  const months = Array.from({ length: 13 }, (_, i) => i);
  const years = [0].concat(Array.from({ length: 20 }, (_, i) => i + 2017));

  function returnJsxFormElement(el) {
    if (el === "category") {
      var defaultCategory = "no-category";
      var categories = columnsTitles["pictures-categories"];

      if (route === "posts") {
        defaultCategory = "misc";
        categories = columnsTitles["posts-categories"];
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
    } else if (el === "redraw" || el === "hide") {
      return (
        <div className={styles.formBlock}>
          <div className={styles.formLabel}>{el}</div>
          <Select
            size="small"
            sx={formStyle}
            key={el}
            defaultValue={currentRowInfo.el ? currentRowInfo.el : 0}
            onChange={(e) =>
              setRequestBody((prev) => ({
                ...prev,
                [el]: e.target.value,
              }))
            }
          >
            {["0", "1"].map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </div>
      );
    } else if (el === "created") {
      return (
        <div className={styles.formBlock}>
          <div className={styles.formLabel}>{el}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Select
              size="small"
              sx={formStyle}
              defaultValue={
                currentRowInfo[el]
                  ? parseInt(currentRowInfo[el].split("-")[0])
                  : 0
              }
              key={"months"}
              onChange={(e) => {
                const newData = `${
                  currentRowInfo[el]
                    ? "" +
                      e.target.value +
                      "-" +
                      currentRowInfo[el].split("-")[1]
                    : "" + e.target.value + "-0"
                }`;
                setRequestBody((prev) => ({
                  ...prev,
                  created: newData,
                }));
                setCurrentRowInfo((prev) => ({
                  ...prev,
                  created: newData,
                }));
              }}
            >
              {months.map((el) => (
                <MenuItem value={el} key={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
            <Select
              size="small"
              sx={formStyle}
              defaultValue={
                currentRowInfo[el]
                  ? parseInt(currentRowInfo[el].split("-")[1])
                  : 0
              }
              key={"years"}
              onChange={(e) => {
                const newData = `${
                  currentRowInfo[el]
                    ? "" +
                      currentRowInfo[el].split("-")[0] +
                      "-" +
                      e.target.value
                    : "0-" + e.target.value
                }`;
                setRequestBody((prev) => ({
                  ...prev,
                  created: newData,
                }));
                setCurrentRowInfo((prev) => ({
                  ...prev,
                  created: newData,
                }));
              }}
            >
              {years.map((el) => (
                <MenuItem value={el} key={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </div>
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
    } else if (el === "arrangement") {
      return (
        <div className={styles.formBlock}>
          <div className={styles.formLabel}>{`${el}:`}</div>
          <TextField
            size="small"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            sx={formStyle}
            defaultValue={currentRowInfo[el] ? currentRowInfo[el] : 0}
            key={el}
            onChange={(e) => {
              setRequestBody((prev) => ({
                ...prev,
                [el]: parseInt(e.target.value),
              }));
            }}
          ></TextField>
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
              src={`${process.env.REACT_APP_API_URL}/pictures/${currentRowInfo.category}/${currentRowInfo.pictureName}`}
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
                  } else if (
                    route === "posts" &&
                    (!requestBody.title ||
                      requestBody.title === "" ||
                      !requestBody.txt)
                  ) {
                    alert("Post title and text should not be empty!!!");
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
          ) : cropperIsOpen ? (
            <div className={styles.textEditorBox}>
              <div className={styles.closeIconWrapper}>
                <CloseIcon
                  onClick={() => {
                    setCropperIsOpen(false);
                    setEditorIsOpen(true);
                  }}
                  sx={closeIconStyle}
                />
              </div>
              <Cropper
                src={`${process.env.REACT_APP_API_URL}/pictures/${currentRowInfo.category}/${currentRowInfo.pictureName}`}
                style={{ height: "600px" }}
                aspectRatio={1 / 1}
                guides={true}
                background={false}
                autoCropArea={1}
                viewMode={2}
                crop={onCrop}
                ref={cropperRef}
              />
              <div className={styles.editorButtonBox}>
                <div
                  className={styles.submitButton}
                  onClick={() => {
                    postPreview(croppedImage);
                    setCropperIsOpen(false);
                    setEditorIsOpen(true);
                  }}
                >
                  Submit preview
                </div>
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
              sortingMode="client"
              throttleRowsMs={2000}
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
