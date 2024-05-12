import userQuery from "./baseQuery.js";

const makeIdFirst = (arr) => {
  const idIndex = arr.indexOf("id");

  if (idIndex > -1) {
    arr.splice(arr.indexOf("id"), 1);
    arr.unshift("id");
  }

  return arr;
};

const getCategoriesQuery = (tableName) => {
  return `
  SELECT column_type
  FROM information_schema.columns
  WHERE table_name = '${tableName}'
  AND column_name = 'category';
`
}

const getCategoriesListFromRes = (res) => {
  const enumString = res[0]["COLUMN_TYPE"];

  const arr = enumString
    .substring(5, enumString.length - 1)
    .replaceAll("'", "")
    .split(",");

  return makeIdFirst(arr);
};

const getCategories = async (tableName) => {
  const query = getCategoriesQuery(tableName);

  const res = await userQuery(
    query
  );

  return getCategoriesListFromRes(res);
}

export async function getPicturesCategories() {
  return await getCategories("picture");
}

export async function getPostsCategories() {
  return await getCategories("post");
}

const getColumnsQuery = (tableName) => {
  return `
  SELECT column_name
  FROM information_schema.columns
  WHERE table_name = '${tableName}';
`;
};

const getColumnsNames = async (tableName) => {
  const query = getColumnsQuery(tableName);
  const res = await userQuery(query);
  const listFromRes = res.map((name) => name.COLUMN_NAME);
  return makeIdFirst(listFromRes);
};

export async function getPicturesColumnsNames() {
  return await getColumnsNames("picture");
}

export async function getPostsColumnsNames() {
  return await getColumnsNames("post");
}

export async function getSeriesDescriptionsColumnsNames() {
  return await getColumnsNames("description");
}
