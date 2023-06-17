import axios from "../../../../axios";

export default async function uploadToTable(
  route,
  requestBody,
  headers,
  setDataChanged
) {
  try {
    await axios.post(`${route}`, requestBody, { headers: headers });
    setDataChanged(true);
  } catch (err) {
    console.warn(err);
    alert("Something went wrong while uploading!");
  }
}
