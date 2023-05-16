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

export async function uploadDescription(txt, category, series, arrangement) {
  const res = await userQuery(
    `
      INSERT INTO description(txt, category, series, arrangement)
      VALUE (?,COALESCE(?, DEFAULT(category)),?,COALESCE(?, DEFAULT(arrangement)));
  `,
    [txt, category, series, arrangement]
  );
  return res;
}

export async function updateDescription(
  txt,
  category,
  series,
  arrangement,
  id
) {
  const res = await userQuery(
    `
      UPDATE description
      SET
      txt=COALESCE(?, txt),
      category=COALESCE(?, DEFAULT(category)),
      series=COALESCE(?, DEFAULT(series)),
      arrangement=COALESCE(?,DEFAULT(arrangement))
      WHERE id=?
  `,
    [txt, category, series, arrangement, id]
  );
  return res;
}

export async function deleteDescription(id) {
  const res = await userQuery(
    `
      DELETE FROM description
      WHERE id=?
  `,
    [id]
  );
  return res;
}

export async function updatePicturesSeries(oldSeries, newSeries) {
  const res = await userQuery(
    `
      UPDATE picture
      SET series=COALESCE(?, DEFAULT(series))
      WHERE series=?;
        `,
    [newSeries, oldSeries]
  );
  return res;
}
