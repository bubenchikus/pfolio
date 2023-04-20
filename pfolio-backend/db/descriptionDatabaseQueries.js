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

export async function getAllSeriesDescriptions() {
  const res = await userQuery(
    `
      SELECT * 
      FROM description
      WHERE category!="page";
  `
  );
  return res;
}

export async function uploadDescription(txt, category, series) {
  const res = await userQuery(
    `
      INSERT INTO description(txt, category, series)
      VALUE (?,?,?)

  `,
    [txt, category, series]
  );
  return res;
}

export async function updateDescription(txt, category, series) {
  const res = await userQuery(
    `
      UPDATE description
      SET
      txt=COALESCE(?, txt)
      WHERE category=?
      AND series=?
  `,
    [txt, category, series]
  );
  return res;
}

export async function deleteDescription(category, series) {
  const res = await userQuery(
    `
      DELETE FROM description
      WHERE category=?
      AND series=?
  `,
    [category, series]
  );
  return res;
}
