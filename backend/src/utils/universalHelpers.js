// will be used for fs actions
export function standardError(err) {
  if (err) {
    console.error(err);
    return;
  }
}
