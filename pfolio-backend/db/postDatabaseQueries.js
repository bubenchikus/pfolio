import userQuery from "./baseQuery.js";

export async function getAllPosts() {
  const res = await userQuery(`
      SELECT * 
      FROM post;
  `);
  return res;
}

export async function getPostsByCategory(category) {
  const res = await userQuery(
    `
        SELECT *
        FROM post
        WHERE category=?;
    `,
    [category]
  );
  return res;
}
