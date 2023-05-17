export const sortImagesBySeries = (imagesData) => {
  var images = {};
  var galleryIndexes = {};

  imagesData?.forEach((element) => {
    if (galleryIndexes[element.series]) {
      element.galleryIndex = galleryIndexes[element.series];
      galleryIndexes[element.series] += 1;
    } else {
      element.galleryIndex = 0;
      galleryIndexes[element.series] = 1;
    }

    if (element.series in images) {
      images[element.series].push(element);
    } else {
      images[element.series] = [element];
    }
  });

  return images;
};
