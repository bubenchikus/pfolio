import axios from "../../../../axios";

export default async function updateTable(
  route,
  requestBody,
  currentRowInfo,
  headers,
  setDataChanged,
  resetEditor
) {
  try {
    await axios.patch(`${route}/${currentRowInfo.id}`, requestBody, {
      headers: headers,
    });
    setDataChanged(true);
    resetEditor();
  } catch (err) {
    console.error("Something went wrong in the updating process!");
  }
}
