import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "../../TableTemplate.module.scss";

export const RedrawOrHideSelect = ({
  el,
  formStyle,
  requestBody,
  setRequestBody,
}) => {
  return (
    <div className={styles.formBlock}>
      <div className={styles.formLabel}>{`${el}:`}</div>
      <Select
        size="small"
        sx={formStyle}
        key={el}
        defaultValue={requestBody[el] ? requestBody[el] : "0"}
        onChange={(e) => {
          setRequestBody((prev) => ({
            ...prev,
            [el]: e.target.value,
          }));
        }}
      >
        {["0", "1"].map((el) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
