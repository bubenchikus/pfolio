import styles from "../TableTemplate.module.scss";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { postPreview } from "./helpers/postPreview";
import { randomString } from "../../../utils/randomString";

export const CropWindow = ({
  cropperRef,
  setCropperIsOpen,
  croppedImage,
  setCroppedImage,
  currentRowInfo,
  setEditorIsOpen,
  setCurrentRowInfo,
  setRequestBody,
  setDataChanged,
}) => {
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;

    cropper
      .getCroppedCanvas({
        width: 350,
        height: 350,
      })
      .toBlob((blob) => {
        setCroppedImage(blob);
      });
  };
  return (
    <div className={styles.textEditorBox}>
      <Cropper
        src={`${process.env.REACT_APP_API_URL}/pictures/${currentRowInfo.category}/${currentRowInfo.pictureName}`}
        style={{ height: "600px" }}
        aspectRatio={1 / 1}
        guides={true}
        background={false}
        autoCropArea={1}
        viewMode={2}
        crop={onCrop}
        ref={cropperRef}
      />
      <div className={styles.editorButtonBox}>
        <div
          className={styles.submitButton}
          onClick={() => {
            const pictureName = currentRowInfo.previewName
              ? currentRowInfo.previewName
              : randomString();
            setCurrentRowInfo((prev) => ({
              ...prev,
              previewName: pictureName,
            }));
            setRequestBody((prev) => ({
              ...prev,
              previewName: pictureName,
            }));
            postPreview(croppedImage, pictureName, setDataChanged);
            setCropperIsOpen(false);
            setEditorIsOpen(true);
          }}
        >
          Submit preview
        </div>
      </div>
    </div>
  );
};
