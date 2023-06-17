import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "../../TableTemplate.module.scss";

const CategorySelect = ({
  formStyle,
  currentRowInfo,
  route,
  columnsTitles,
  requestBody,
  setRequestBody,
}) => {
  const defaultCategory = route === "posts" ? "misc" : "no-category";
  const categories =
    route === "posts"
      ? columnsTitles["posts-categories"]
      : columnsTitles["pictures-categories"];

  return (
    <div className={styles.formBlock}>
      <div className={styles.formLabel}>category:</div>
      <Select
        size="small"
        sx={formStyle}
        defaultValue={
          requestBody["category"] ? requestBody["category"] : defaultCategory
        }
        key={"category"}
        onChange={(e) => {
          if (route === "pictures") {
            setRequestBody((prev) => ({
              ...prev,
              category: e.target.value,
              oldCategory: currentRowInfo["category"],
              pictureName: currentRowInfo["pictureName"],
              oldPictureName: currentRowInfo["pictureName"],
            }));
          } else {
            setRequestBody((prev) => ({
              ...prev,
              category: e.target.value,
            }));
          }
        }}
      >
        {categories?.map((el) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CategorySelect;
