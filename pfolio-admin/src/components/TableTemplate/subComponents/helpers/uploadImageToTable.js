import axios from "../../../../axios";
import { randomString } from "../../../../utils/randomString";

export const uploadImageToTable = async (
  event,
  currentRowInfo,
  requestBody,
  headers
) => {
  try {
    var formData = new FormData();
    const file = event.target.files[0];

    formData.append("image", file);

    currentRowInfo.category =
      requestBody.category =
      requestBody.oldCategory =
        "no-category";
    currentRowInfo.pictureName =
      requestBody.pictureName =
      requestBody.oldPictureName =
        file.name;
    currentRowInfo.previewName = requestBody.previewName = randomString();

    await axios.post("/upload", formData, { headers: headers });

    const res = await axios.post("pictures", requestBody, {
      headers: headers,
    });

    currentRowInfo.id = res.data[0].id;
  } catch (err) {
    console.warn(err);
    alert("Error occured while uploading file!");
  }
};
