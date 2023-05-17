import axios from "../../../../axios";

export const uploadToTable = async (route, requestBody, headers) => {
  try {
    await axios.post(`${route}`, requestBody, { headers: headers });
  } catch (err) {
    console.warn(err);
    alert("Something went wrong while uploading!");
  }
};
