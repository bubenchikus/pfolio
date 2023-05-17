import Avatar from "@mui/material/Avatar";

export const setupColumns = (data, route, columnsTitles) => {
  var columns = [];

  if (data && data.length > 0 && route === "pictures") {
    columns = [
      {
        field: "preview",
        flex: 1,
        renderCell: (params) => {
          return (
            <>
              <Avatar
                src={
                  params.row.previewName
                    ? `${process.env.REACT_APP_API_URL}/pictures/previews/${params.row.previewName}.png`
                    : ""
                }
                variant="square"
                alt=""
              />
            </>
          );
        },
      },
    ];
  }

  columnsTitles[route]?.forEach((el) => {
    var flex = 1;
    if (["id", "redraw", "hide"].includes(el)) {
      flex = 0.5;
    }
    if (["about", "txt"].includes(el)) {
      flex = 2.5;
    }
    columns.push({ field: el, flex: flex });
  });

  return columns;
};
