const app = require("../app");
const supertest = require("supertest");
const { expect } = require("chai");
const playStoreData = require("../play-data");

describe("a Google Play app list app", () => {
  it("should return a message from GET", () => {
    supertest(app).get("/apps").expect(200);
  });
  it("should filter by genre when genres param is true", () => {
    const expectedAnswer = [
      playStoreData[2],
      playStoreData[4],
      playStoreData[5],
      playStoreData[9],
      playStoreData[15],
    ];
    supertest(app)
      .get("/apps")
      .query({ genres: "Casual" })
      .expect(200, expectedAnswer);
  });
  it("should sort by app field when sort=App param is true", () => {
    const expectedAnswer = [
      playStoreData[12],
      playStoreData[11],
      playStoreData[19],
      playStoreData[4],
      playStoreData[2],
      playStoreData[15],
      playStoreData[17],
      playStoreData[7],
      playStoreData[10],
      playStoreData[5],
      playStoreData[18],
      playStoreData[13],
      playStoreData[9],
      playStoreData[0],
      playStoreData[6],
      playStoreData[3],
      playStoreData[14],
      playStoreData[1],
      playStoreData[8],
      playStoreData[16],
    ];
    supertest(app)
      .get("/apps")
      .query({ sort: "App" })
      .expect(200, expectedAnswer);
  });
  it("should sort by rating when sort=Rating param is true"), () => {};
  it("should filter first if both params are true"), () => {};
});
