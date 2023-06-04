export const getSeriesArrangementFromImages = (images, seriesDescriptions) => {
  if (!images) {
    return [];
  }

  return Object.keys(images).sort(function (a, b) {
    if (
      seriesDescriptions?.filter((e) => e["series"] === a)[0]?.arrangement ===
      seriesDescriptions?.filter((e) => e["series"] === b)[0]?.arrangement
    ) {
      return b?.localeCompare(a);
    }
    return (
      (seriesDescriptions?.filter((e) => e["series"] === b)[0]?.arrangement
        ? seriesDescriptions?.filter((e) => e["series"] === b)[0]?.arrangement
        : 0) -
      (seriesDescriptions?.filter((e) => e["series"] === a)[0]?.arrangement
        ? seriesDescriptions?.filter((e) => e["series"] === a)[0]?.arrangement
        : 0)
    );
  });
};
