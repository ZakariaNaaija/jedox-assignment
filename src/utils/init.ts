import * as fs from "fs";

import { generateRandomNumber, transformToSnakeCase } from "./transforms.util";

const legalEntities = ["11", "12", "13", "All Entities"];
const versions = ["Actual", "Budget"];
const currencies = ["LC", "USD", "EUR"];
const articles = [
  "All Articles",
  "Bikes",
  "Mountain Bikes",
  "Product",
  "Product A",
];
const regions = ["Europe", "Germany", "Freiburg", "Berlin", "Great Britain"];
const measures = ["Units", "Unit Price", "Gross Revenue"];

const combinations: Record<string, { key: string; value: number }[]> = {};
for (const legalEntity of legalEntities) {
  for (const version of versions) {
    for (const currency of currencies) {
      const key = `${transformToSnakeCase(legalEntity)}#${transformToSnakeCase(
        version
      )}#${currency}`;

      if (!combinations[key]) {
        combinations[key] = [];
      }

      for (const article of articles) {
        for (const region of regions) {
          for (const measure of measures) {
            const combinationKey = `${transformToSnakeCase(
              article
            )}#${transformToSnakeCase(region)}#${transformToSnakeCase(
              measure
            )}`;
            const value = generateRandomNumber(0, 999999);
            combinations[key].push({ key: combinationKey, value });
          }
        }
      }
    }
  }
}

fs.writeFile(
  "./utils/data.json",
  JSON.stringify(combinations, null, 2),
  (err) => {
    if (err) {
      console.error("Error writing combinations to file:", err);
    } else {
      console.log("Combinations have been written to combinations.json");
    }
  }
);
