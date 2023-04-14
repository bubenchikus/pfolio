import userQuery from "./baseQuery.js";

export async function getDescriptionsByCategory(category) {
  const res = await userQuery(
    `
      SELECT * 
      FROM description
      WHERE category=?;
  `,
    [category]
  );
  return res;
}

export async function getPageDescription(page) {
  const res = await userQuery(
    `
        SELECT * 
        FROM description
        WHERE category="page" AND series=?;
    `,
    [page]
  );
  return res;
}
