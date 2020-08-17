const express = require("express");
const morgan = require("morgan");
const playStoreData = require("./play-data");

const app = express();

// syntax is: morgan(format, options) where `format` is a string or function and
// `options` is an object
app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { sort = "" } = req.query;
  const { genres = "" } = req.query;

  console.log(playStoreData);

  let results;
  let appSortResults;
  let ratingSortResults;

  if (genres) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      res.status(400).send(
        `Genres parameter must be one of the following: 
          'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', or 'Card'`
      );
    }
    results = playStoreData.filter((result) =>
      result["Genres"].includes(genres)
    );
  } else {
    results = playStoreData;
  }

  if (sort) {
    // sort by Rating or App
    if (!["App", "Rating"].includes(sort)) {
      return res.status(400).send("sort value must be either by App or Rating");
    }
    if (sort === "Rating") {
      ratingSortResults = results.sort((a, b) => {
        const lowerRating = Number(a[sort]) > Number(b[sort]) ? -1 : 0;
        ratingSort = Number(a[sort]) < Number(b[sort]) ? 1 : lowerRating;

        return ratingSort;
      });
    } else if (sort === "App") {
      appSortResults = results.sort((a, b) => {
        const laterLetter =
          a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : 0;
        appSort =
          a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : laterLetter;

        return appSort;
      });
    }
  }

  const finalResults = (appSortResults, ratingSortResults) => {
    if (ratingSortResults) {
      return ratingSortResults;
    } else if (appSortResults) {
      return appSortResults;
    } else {
      return results;
    }
  };
  res.json(finalResults()).send();
});

module.exports = app;
