import * as fs from "fs";

// Define the categories
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
const regions = ["Europe", "Great Britain", "Germany", "Berlin", "Freiburg"];
const measures = ["Units", "Unit Price", "Gross Revenue"];

// Function to generate a random number
function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function transformValue(value: string): string {
  return value.toUpperCase().replace(/\s+/g, "_");
}

// Generate all combinations
const combinations: Record<string, { key: string; value: number }[]> = {};
for (const legalEntity of legalEntities) {
  for (const version of versions) {
    for (const currency of currencies) {
      // Generate key for the combination
      const key = `${transformValue(legalEntity)}#${transformValue(
        version
      )}#${currency}`;

      // Initialize combinations for this key if not already present
      if (!combinations[key]) {
        combinations[key] = [];
      }

      // Generate combinations for articles, regions, and measures
      for (const article of articles) {
        for (const region of regions) {
          for (const measure of measures) {
            const combinationKey = `${transformValue(
              article
            )}#${transformValue(region)}#${transformValue(measure)}`;
            const value = generateRandomNumber(0, 999999); // Random number between 0 and 999999
            combinations[key].push({ key: combinationKey, value });
          }
        }
      }
    }
  }
}

// Write combinations to a JSON file
fs.writeFile("data.json", JSON.stringify(combinations, null, 2), (err) => {
  if (err) {
    console.error("Error writing combinations to file:", err);
  } else {
    console.log("Combinations have been written to combinations.json");
  }
});
