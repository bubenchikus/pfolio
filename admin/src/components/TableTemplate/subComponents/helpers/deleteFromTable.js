import axios from "../../../../axios";

export default async function deleteFromTable(
  route,
  currentRowInfo,
  headers,
  setDataChanged
) {
  try {
    if (currentRowInfo && currentRowInfo.id) {
      await axios.delete(`${route}/${currentRowInfo.id}`, { headers: headers });
      setDataChanged(true);
    }
  } catch (err) {
    console.error("Something went wrong while deleting data from table!");
  }
}
