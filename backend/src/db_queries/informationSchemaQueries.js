import userQuery from "./baseQuery.js";

const getCategoriesFromEnum = (enumString) => {
    return enumString
        .substring(5, enumString.length - 1)
        .replaceAll("'", "")
        .split(",");
};

export async function getPicturesCategories() {
    const res = await userQuery(
        `
        SELECT column_type
        FROM information_schema.columns
        WHERE table_name = 'picture'
        AND column_name = 'category';
      `
    );
    return getCategoriesFromEnum(res[0]["COLUMN_TYPE"]);
}

export async function getPostsCategories() {
    const res = await userQuery(
        `
        SELECT column_type
        FROM information_schema.columns
        WHERE table_name = 'post'
        AND column_name = 'category';
      `
    );
    return getCategoriesFromEnum(res[0]["COLUMN_TYPE"]);
}

export async function getPicturesColumnsNames() {
    const res = await userQuery(
        `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'picture';
      `
    );
    return res.map((name) => name.COLUMN_NAME);
}

export async function getPostsColumnsNames() {
    const res = await userQuery(
        `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'post';
      `
    );
    return res.map((name) => name.COLUMN_NAME);
}
