import axios from "../../../../axios";

export default async function updateTable(
  route,
  requestBody,
  currentRowInfo,
  headers,
  setDataChanged
) {
  try {
    await axios.patch(`${route}/${currentRowInfo.id}`, requestBody, {
      headers: headers,
    });
    setDataChanged(true);
  } catch (err) {
    console.warn(err);
    alert("Something went wrong while updating table!");
  }
}
