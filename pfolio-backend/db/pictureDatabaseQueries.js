import userQuery from "./baseQuery.js";

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

export async function getPictureByUrl(pictureUrl) {
  const res = await userQuery(
    `
        SELECT * 
        FROM picture
        WHERE pictureUrl=?;
    `,
    [pictureUrl]
  );
  return res;
}

export async function uploadPicture(
  pictureUrl,
  title,
  created,
  category,
  series,
  about,
  redraw,
  previewUrl
) {
  const res = await userQuery(
    `
        INSERT INTO picture(pictureUrl, title, created, category, series, about, redraw, previewUrl)
        VALUE (?,?,?,?,?,?,?,?);
      `,
    [pictureUrl, title, created, category, series, about, redraw, previewUrl]
  );
  return res;
}

export async function updatePicture(
  pictureUrl,
  title,
  created,
  category,
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
        pictureUrl = COALESCE(?, pictureUrl),
        title = COALESCE(?, title),
        created = COALESCE(?, created),
        category = COALESCE(?, category),
        series = COALESCE(?, series),
        about= COALESCE(?, about),
        redraw = COALESCE(?, redraw),
        previewUrl = COALESCE(?, previewUrl)
        WHERE id=?;
      `,
    [
      pictureUrl,
      title,
      created,
      category,
      series,
      about,
      redraw,
      previewUrl,
      id,
    ]
  );
  return res;
}

export async function deletePictureByUrl(pictureUrl) {
  const res = await userQuery(
    `
      DELETE FROM picture
      WHERE pictureUrl=?;
        `,
    [pictureUrl]
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

export async function getAllPictures() {
  const res = await userQuery(
    `
        SELECT * 
        FROM picture;
    `
  );
  return res;
}
