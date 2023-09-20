import axios from "../../../../axios";

export default async function postPreview(blob, pictureName, setDataChanged) {
  try {
    const formData = new FormData();

    formData.append("image", blob, `${pictureName}.webp`);

    await axios
      .post("/upload-preview", formData, {
        headers: {
          Authentication:
            "Bearer " + JSON.parse(localStorage.getItem("token")).token,
          enctype: "multipart/form-data",
        },
      })
      .then(setDataChanged(true));
  } catch (err) {
    console.error("Something went wrong while uploading preview!");
  }
}
