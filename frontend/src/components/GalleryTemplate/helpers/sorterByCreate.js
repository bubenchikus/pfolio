export default function sorterByCreate(a, b) {
  const a_month = parseInt(a.created?.split("-")[0] || "0");
  const a_year = parseInt(a.created?.split("-")[1] || "0");
  const b_month = parseInt(b.created?.split("-")[0] || "0");
  const b_year = parseInt(b.created?.split("-")[1] || "0");
  return a_year < b_year
    ? 1
    : a_year > b_year
    ? -1
    : a_month < b_month
    ? 1
    : a_month > b_month
    ? -1
    : 0;
}
