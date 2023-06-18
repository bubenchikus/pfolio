import config from "config";

function sortImagesByCreatedDate(a, b) {
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

function numToMonth(num) {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  if (months[num - 1]) {
    return months[num - 1] + " ";
  }
  return "";
}

function processDate(date) {
  if (date && date.split("-")[1] && date.split("-")[1] !== "0") {
    if (date[0] === "0") {
      return date.split("-")[1];
    } else {
      return `${numToMonth(date.split("-")[0])}${date.split("-")[1]}`;
    }
  } else {
    return "unknown";
  }
}

function sortImagesBySeries(pictures) {
  const images = {};
  const galleryIndexes = {};

  pictures?.forEach((element) => {
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

export function processPictures(pictures) {
  pictures.sort(function (a, b) {
    return sortImagesByCreatedDate(a, b);
  });
  pictures.forEach((picture) => {
    picture.created = processDate(picture.created);
  });

  return sortImagesBySeries(pictures);
}

export function arrangeSeries(series) {
  return series.sort((a, b) => {
    const a_arr = a?.arrangement;
    const b_arr = b?.arrangement;
    if (a_arr > b_arr) {
      return -1;
    } else if (a_arr < b_arr) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function paginatePosts(posts) {
  posts.sort(function (a, b) {
    return new Date(b.created) - new Date(a.created);
  });

  const pagesNum = config.get("journal.postsPerPage");
  const paginatedPosts = [];

  for (let i = 0; i < Math.ceil(posts.length / pagesNum); i++) {
    paginatedPosts.push([]);
    for (let j = 0; j < pagesNum; j++) {
      if (posts[i * pagesNum + j]) {
        console.log(posts[i * pagesNum + j].created);
        posts[i * pagesNum + j].created = posts[i * pagesNum + j].created
          .toISOString()
          .substring(0, 10);
        paginatedPosts[i].push(posts[i * pagesNum + j]);
      } else {
        break;
      }
    }
  }

  return paginatedPosts;
}
