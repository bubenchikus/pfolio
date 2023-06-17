export default function consortImagesBySeries(imagesData) {
  const images = {};
  const galleryIndexes = {};

  imagesData?.forEach((element) => {
    if (galleryIndexes[element.series]) {
      element.galleryIndex = galleryIndexes[element.series];
      galleryIndexes[element.series] += 1;
    } else {
      element.galleryIndex = 0;
      galleryIndexes[element.series] = 1;
    }

    if (images.hasOwnProperty(element.series)) {
      images[element.series].push(element);
    } else {
      images[element.series] = [element];
    }
  });

  return images;
}
