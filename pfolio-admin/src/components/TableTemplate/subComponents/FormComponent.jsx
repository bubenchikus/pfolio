import { CategorySelect } from "./FormFields/CategorySelect";
import { RedrawOrHideSelect } from "./FormFields/RedrawOrHideSelect";
import { CreatedSelect } from "./FormFields/CreatedSelect";
import { TxtButton } from "./FormFields/TxtButton";
import { ArrangementText } from "./FormFields/ArrangementText";
import { GeneralTextField } from "./FormFields/GeneralTextField";
import { SeriesSelect } from "./FormFields/SeriesSelect";

export const FormComponent = ({
  el,
  currentRowInfo,
  setCurrentRowInfo,
  requestBody,
  setRequestBody,
  columnsTitles,
  route,
  editorMode,
  setEditorIsOpen,
  setTextEditorIsOpen,
  series,
}) => {
  const formStyle = { color: "black", borderColor: "black" };

  if (el === "category") {
    return (
      <CategorySelect
        formStyle={formStyle}
        currentRowInfo={currentRowInfo}
        route={route}
        columnsTitles={columnsTitles}
        requestBody={requestBody}
        setRequestBody={setRequestBody}
      />
    );
  } else if (el === "redraw" || el === "hide") {
    return (
      <RedrawOrHideSelect
        el={el}
        formStyle={formStyle}
        requestBody={requestBody}
        setRequestBody={setRequestBody}
      />
    );
  } else if (el === "created") {
    return (
      <CreatedSelect
        formStyle={formStyle}
        currentRowInfo={currentRowInfo}
        requestBody={requestBody}
        setRequestBody={setRequestBody}
        setCurrentRowInfo={setCurrentRowInfo}
      />
    );
  } else if (el === "txt") {
    return (
      <TxtButton
        formSrtyle={formStyle}
        setEditorIsOpen={setEditorIsOpen}
        setTextEditorIsOpen={setTextEditorIsOpen}
      />
    );
  } else if (el === "arrangement") {
    return (
      <ArrangementText
        formStyle={formStyle}
        currentRowInfo={currentRowInfo}
        requestBody={requestBody}
        setRequestBody={setRequestBody}
      />
    );
  } else if (el === "series" && route === "pictures") {
    return (
      <SeriesSelect
        formStyle={formStyle}
        currentRowInfo={currentRowInfo}
        requestBody={requestBody}
        setRequestBody={setRequestBody}
        series={series}
      />
    );
  }
  return (
    <GeneralTextField
      el={el}
      formStyle={formStyle}
      requestBody={requestBody}
      setRequestBody={setRequestBody}
      currentRowInfo={currentRowInfo}
      route={route}
    />
  );
};
