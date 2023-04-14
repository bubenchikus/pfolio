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

export async function insertPicture(pictureUrl, title, created, category) {
  const res = await userQuery(
    `
        INSERT INTO picture(pictureUrl, title, created, category)
        VALUE (?,?,?,?);
      `,
    [pictureUrl, title, created, category]
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

export async function getAllPictures() {
  const res = await userQuery(
    `
        SELECT * 
        FROM picture
    `
  );
  return res;
}
