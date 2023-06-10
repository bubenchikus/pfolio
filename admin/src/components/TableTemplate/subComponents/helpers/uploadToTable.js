import axios from "../../../../axios";

export const uploadToTable = async (
  route,
  requestBody,
  headers,
  setDataChanged
) => {
  try {
    await axios.post(`${route}`, requestBody, { headers: headers });
    setDataChanged(true);
  } catch (err) {
    console.warn(err);
    alert("Something went wrong while uploading!");
  }
};
