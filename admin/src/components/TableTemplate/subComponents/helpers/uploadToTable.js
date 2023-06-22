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
    alert(
      err.response.data?.msg ||
        err.response.data[0]?.msg ||
        "Something went wrong in the register process!"
    );
  }
}
