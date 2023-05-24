import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "../../TableTemplate.module.scss";

export const CreatedSelect = ({
  formStyle,
  currentRowInfo,
  requestBody,
  setRequestBody,
  setCurrentRowInfo,
}) => {
  const months = Array.from({ length: 13 }, (_, i) => i);
  const years = [0].concat(Array.from({ length: 20 }, (_, i) => i + 2017));

  return (
    <div className={styles.formBlock}>
      <div className={styles.formLabel}>created:</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Select
          MenuProps={{
            sx: { maxHeight: "400px" },
          }}
          size="small"
          sx={formStyle}
          defaultValue={
            requestBody["created"]
              ? requestBody["created"].split("-")[0]
              : currentRowInfo["created"]
              ? parseInt(currentRowInfo["created"].split("-")[0])
              : 0
          }
          key={"months"}
          onChange={(e) => {
            const newData = `${
              currentRowInfo["created"]
                ? "" +
                  e.target.value +
                  "-" +
                  currentRowInfo["created"].split("-")[1]
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
          MenuProps={{
            sx: { maxHeight: "400px" },
          }}
          size="small"
          sx={formStyle}
          defaultValue={
            requestBody["created"]
              ? parseInt(requestBody["created"].split("-")[1])
              : currentRowInfo["created"]
              ? parseInt(currentRowInfo["created"]?.split("-")[1])
              : 0
          }
          key={"years"}
          onChange={(e) => {
            const newData = `${
              currentRowInfo["created"]
                ? "" +
                  currentRowInfo["created"].split("-")[0] +
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
};
