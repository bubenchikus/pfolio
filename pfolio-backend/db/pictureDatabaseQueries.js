import userQuery from "./baseQuery.js";

export async function getAllPictures() {
  const res = await userQuery(
    `
        SELECT * 
        FROM picture;
    `
  );
  return res;
}

export async function getUnhiddenPictures() {
  const res = await userQuery(
    `
        SELECT * 
        FROM picture
        WHERE hide=false;
    `
  );
  return res;
}

export async function getPictureByCategoryAndPictureName(
  category,
  pictureName
) {
  const res = await userQuery(
    `
      SELECT * 
      FROM picture
      WHERE category=?
      AND pictureName=?;
  `,
    [category, pictureName]
  );
  return res;
}

export async function getPicturesByCategory(category) {
  const res = await userQuery(
    `
      SELECT * 
      FROM picture
      WHERE category=?
      AND hide=false;
  `,
    [category]
  );
  return res;
}

export async function getPictureById(id) {
  const res = await userQuery(
    `
        SELECT *
        FROM picture
        WHERE id=?;
    `,
    [id]
  );
  return res;
}

export async function uploadPicture(
  title,
  created,
  category,
  pictureName,
  previewName,
  series,
  about,
  redraw,
  hide
) {
  const res = await userQuery(
    `
        INSERT INTO picture(
          title, 
          created, 
          category, 
          pictureName,
          previewName,
          series, 
          about, 
          redraw, 
          hide)
        VALUE (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          COALESCE(?, DEFAULT(redraw)),
          COALESCE(?, DEFAULT(hide)));
      `,
    [
      title,
      created,
      category,
      pictureName,
      previewName,
      series,
      about,
      redraw,
      hide,
    ]
  );
  return res;
}

export async function updatePicture(
  title,
  created,
  category,
  pictureName,
  previewName,
  series,
  about,
  redraw,
  hide,
  id
) {
  const res = await userQuery(
    `
        UPDATE picture
        SET
        title = COALESCE(?, DEFAULT(title)),
        created = ?,
        category = COALESCE(?, DEFAULT(category)),
        pictureName = COALESCE(?, pictureName),
        previewName = ?,
        series = COALESCE(?, DEFAULT(series)),
        about= ?,
        redraw = COALESCE(?, DEFAULT(redraw)),
        hide = COALESCE(?, DEFAULT(hide))
        WHERE id=?;
      `,
    [
      title,
      created,
      category,
      pictureName,
      previewName,
      series,
      about,
      redraw,
      hide,
      id,
    ]
  );
  return res;
}

export async function deletePictureById(id) {
  const res = await userQuery(
    `
      DELETE FROM picture
      WHERE id=?;
        `,
    [id]
  );
  return res;
}
