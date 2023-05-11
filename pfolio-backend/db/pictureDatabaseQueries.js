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
      WHERE category=?;
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
  previewUrl
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
          previewUrl)
        VALUE (
          COALESCE(?, DEFAULT(title)),
          ?,
          COALESCE(?, DEFAULT(category)),
          ?,
          COALESCE(?, DEFAULT(series)),
          ?,
          ?,
          ?);
      `,
    [title, created, category, pictureName, series, about, redraw, previewUrl]
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
  previewUrl,
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
        series = COALESCE(?, series),
        about= COALESCE(?, about),
        redraw = COALESCE(?, redraw),
        previewUrl = COALESCE(?, previewUrl)
        WHERE id=?;
      `,
    [
      title,
      created,
      category,
      pictureName,
      series,
      about,
      redraw,
      previewUrl,
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
