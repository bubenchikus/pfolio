import TextField from "@mui/material/TextField";
import styles from "../../TableTemplate.module.scss";

const GeneralTextField = ({
  el,
  formStyle,
  requestBody,
  setRequestBody,
  currentRowInfo,
  route,
}) => {
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
          el === "pictureName"
            ? setRequestBody((prev) => ({
                ...prev,
                oldPictureName: currentRowInfo["pictureName"],
                category: currentRowInfo["category"],
                oldCategory: currentRowInfo["category"],
                [el]: e.target.value,
              }))
            : el === "series"
            ? setRequestBody((prev) => ({
                ...prev,
                oldSeries: currentRowInfo["series"],
                [el]: e.target.value,
              }))
            : setRequestBody((prev) => ({ ...prev, [el]: e.target.value }));
        }}
      ></TextField>
    </div>
  );
};

export default GeneralTextField;
