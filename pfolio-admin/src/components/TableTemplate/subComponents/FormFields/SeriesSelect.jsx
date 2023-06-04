import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "../../TableTemplate.module.scss";

export const SeriesSelect = ({
  formStyle,
  currentRowInfo,
  requestBody,
  setRequestBody,
  series,
}) => {
  return (
    <div className={styles.formBlock}>
      <div className={styles.formLabel}>series:</div>
      <Select
        size="small"
        disabled={!series[requestBody.category]}
        sx={formStyle}
        defaultValue={requestBody?.series}
        key={"series"}
        onChange={(e) => {
          setRequestBody((prev) => ({
            ...prev,
            series: e.target.value,
            oldCategory: currentRowInfo["category"],
            pictureName: currentRowInfo["pictureName"],
            oldPictureName: currentRowInfo["pictureName"],
          }));
        }}
      >
        {series[requestBody.category]?.sort().map((el) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
