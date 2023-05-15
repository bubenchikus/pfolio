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
        WHERE hide IS 'NULL';
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
          series, 
          about, 
          redraw, 
          hide)
        VALUE (
          COALESCE(?, DEFAULT(title)),
          ?,
          COALESCE(?, DEFAULT(category)),
          ?,
          COALESCE(?, DEFAULT(series)),
          ?,
          ?,
          COALESCE(?, DEFAULT(hide)));
      `,
    [title, created, category, pictureName, series, about, redraw, hide]
  );
  return res;
}

export async function updatePicture(
  title,
  created,
  category,
  pictureName,
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
        title = COALESCE(?, title),
        created = COALESCE(?, created),
        category = COALESCE(?, category),
        pictureName = COALESCE(?, pictureName),
        series = COALESCE(?, DEFAULT(series)),
        about= COALESCE(?, about),
        redraw = ?,
        hide = COALESCE(?, DEFAULT(hide))
        WHERE id=?;
      `,
    [title, created, category, pictureName, series, about, redraw, hide, id]
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
