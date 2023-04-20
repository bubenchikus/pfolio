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

export async function uploadPost(title, txt, category) {
  const res = await userQuery(
    `
      INSERT INTO post(title, txt, category)
      VALUE (?,?,?)

  `,
    [title, txt, category]
  );
  return res;
}

export async function updatePost(title, txt, category, id) {
  const res = await userQuery(
    `
      UPDATE post
      SET
      title=COALESCE(?, title),
      txt=COALESCE(?, txt),
      category=COALESCE(?, category)
      WHERE id=?
  `,
    [title, txt, category, id]
  );
  return res;
}

export async function deletePost(id) {
  const res = await userQuery(
    `
      DELETE FROM post
      WHERE id=?
  `,
    [id]
  );
  return res;
}
