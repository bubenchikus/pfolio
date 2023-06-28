import Avatar from "@mui/material/Avatar";

export default function setupColumns(data, route, columnsTitles) {
  const columns = [];

  if (data && data.length > 0 && route === "pictures") {
    columns.push({
      field: "preview",
      flex: 1,
      renderCell: (params) => {
        return (
          <Avatar
            src={
              params.row.previewName
                ? `${process.env.REACT_APP_API_URL}/pictures/previews/${params.row.previewName}.webp`
                : ""
            }
            variant="square"
            alt=""
            sx={{
              height: "100%",
              width: "100%",
            }}
          />
        );
      },
    });
  }

  if (columnsTitles) {
    columnsTitles[route]?.forEach((el) => {
      if (["id", "redraw", "hide"].includes(el)) {
        columns.push({ field: el, flex: 0.5 });
      } else if (["pictureName", "txt"].includes(el)) {
        columns.push({ field: el, flex: 2.5 });
      } else {
        columns.push({ field: el, flex: 1 });
      }
    });
  }

  return columns;
}
