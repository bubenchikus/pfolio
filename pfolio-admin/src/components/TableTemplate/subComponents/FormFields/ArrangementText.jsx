import TextField from "@mui/material/TextField";
import styles from "../../TableTemplate.module.scss";

export const ArrangementText = ({
  formStyle,
  currentRowInfo,
  requestBody,
  setRequestBody,
}) => {
  return (
    <div className={styles.formBlock}>
      <div className={styles.formLabel}>arrangement:</div>
      <TextField
        size="small"
        type="number"
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
        sx={formStyle}
        defaultValue={
          requestBody["arrangement"]
            ? requestBody["arrangement"]
            : currentRowInfo["arrangement"]
            ? currentRowInfo["arrangement"]
            : 0
        }
        key={"arrangement"}
        onChange={(e) => {
          setRequestBody((prev) => ({
            ...prev,
            arrangement: parseInt(e.target.value),
          }));
        }}
      ></TextField>
    </div>
  );
};
