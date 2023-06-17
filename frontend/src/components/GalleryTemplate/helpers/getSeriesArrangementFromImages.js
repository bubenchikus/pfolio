export default function getSeriesArrangementFromImages(
  images,
  seriesDescriptions
) {
  if (!images) {
    return [];
  }

  return Object.keys(images).sort(function (a, b) {
    if (
      seriesDescriptions?.find((e) => e["series"] === a)?.arrangement ===
      seriesDescriptions?.find((e) => e["series"] === b)?.arrangement
    ) {
      return b?.localeCompare(a);
    }
    return (
      (seriesDescriptions?.find((e) => e["series"] === b)?.arrangement
        ? seriesDescriptions?.find((e) => e["series"] === b)?.arrangement
        : 0) -
      (seriesDescriptions?.find((e) => e["series"] === a)?.arrangement
        ? seriesDescriptions?.find((e) => e["series"] === a)?.arrangement
        : 0)
    );
  });
}
