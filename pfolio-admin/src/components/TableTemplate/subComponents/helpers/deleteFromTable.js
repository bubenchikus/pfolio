import axios from "../../../../axios";

export const deleteFromTable = async (
  route,
  currentRowInfo,
  headers,
  setDataChanged
) => {
  try {
    await axios.delete(`${route}/${currentRowInfo?.id}`, { headers: headers });
    setDataChanged(true);
  } catch (err) {
    console.warn(err);
    alert("Something went wrong while deleting data from table!");
  }
};