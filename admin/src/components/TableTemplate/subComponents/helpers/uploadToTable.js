import axios from "../../../../axios";

export default async function uploadToTable(
  route,
  requestBody,
  headers,
  setDataChanged,
  resetEditor
) {
  try {
    await axios.post(`${route}`, requestBody, { headers: headers });
    setDataChanged(true);
    resetEditor();
  } catch (err) {
    console.error("Something went wrong in the uploading process!");
  }
}
