import axios from "../../../../axios";

export const postPreview = async (blob, pictureName, setDataChanged) => {
  try {
    const formData = new FormData();

    formData.append("image", blob, `${pictureName}.png`);

    await axios.post("/upload-preview", formData, {
      headers: {
        Authentication:
          "Bearer " + JSON.parse(sessionStorage.getItem("token")).token,
        enctype: "multipart/form-data",
      },
    });
    setDataChanged(true);
  } catch (err) {
    console.warn(err);
    alert("Something went wrong while uploading preview!");
  }
};
