import userQuery from "./baseQuery.js";
import config from "config";

const calculateLimitsByPage = (page) => {
  page = parseInt(page) || 1;
  const postsPerPage = parseInt(config.get("journal.postsPerPage"));
  return [(page - 1) * postsPerPage, postsPerPage];
};

export async function getAllPosts() {
  const res = await userQuery(
    `
      SELECT * 
      FROM post
      ORDER BY created DESC
  `
  );
  return res;
}

export async function getAllPostsByPage(page) {
  const res = await userQuery(
    `
      SELECT * 
      FROM post
      ORDER BY created DESC
      LIMIT ?, ?;
  `,
    calculateLimitsByPage(page)
  );
  return res;
}

export async function getPostsByCategory(category, page) {
  const res = await userQuery(
    `
        SELECT *
        FROM post
        WHERE category=?
        ORDER BY created DESC
        LIMIT ?, ?;
    `,
    [category, ...calculateLimitsByPage(page)]
  );
  return res;
}

export async function uploadPost(title, txt, category) {
  const res = await userQuery(
    `
      INSERT INTO post(title, txt, category)
      VALUE (?,?,COALESCE(?, DEFAULT(category)))

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

export async function getPostById(id) {
  const res = await userQuery(
    `
        SELECT *
        FROM post
        WHERE id=?;
    `,
    [id]
  );
  return res;
}
