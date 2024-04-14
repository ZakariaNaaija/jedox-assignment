"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var transforms_util_1 = require("./transforms.util");
var legalEntities = ["11", "12", "13", "All Entities"];
var versions = ["Actual", "Budget"];
var currencies = ["LC", "USD", "EUR"];
var articles = [
    "All Articles",
    "Bikes",
    "Mountain Bikes",
    "Product",
    "Product A",
];
var regions = ["Europe", "Germany", "Freiburg", "Berlin", "Great Britain"];
var measures = ["Units", "Unit Price", "Gross Revenue"];
var combinations = {};
for (var _i = 0, legalEntities_1 = legalEntities; _i < legalEntities_1.length; _i++) {
    var legalEntity = legalEntities_1[_i];
    for (var _a = 0, versions_1 = versions; _a < versions_1.length; _a++) {
        var version = versions_1[_a];
        for (var _b = 0, currencies_1 = currencies; _b < currencies_1.length; _b++) {
            var currency = currencies_1[_b];
            var key = "".concat((0, transforms_util_1.transformToSnakeCase)(legalEntity), "#").concat((0, transforms_util_1.transformToSnakeCase)(version), "#").concat(currency);
            if (!combinations[key]) {
                combinations[key] = [];
            }
            for (var _c = 0, articles_1 = articles; _c < articles_1.length; _c++) {
                var article = articles_1[_c];
                for (var _d = 0, regions_1 = regions; _d < regions_1.length; _d++) {
                    var region = regions_1[_d];
                    for (var _e = 0, measures_1 = measures; _e < measures_1.length; _e++) {
                        var measure = measures_1[_e];
                        var combinationKey = "".concat((0, transforms_util_1.transformToSnakeCase)(article), "#").concat((0, transforms_util_1.transformToSnakeCase)(region), "#").concat((0, transforms_util_1.transformToSnakeCase)(measure));
                        var value = (0, transforms_util_1.generateRandomNumber)(0, 999999);
                        combinations[key].push({ key: combinationKey, value: value });
                    }
                }
            }
        }
    }
}
fs.writeFile("./utils/data.json", JSON.stringify(combinations, null, 2), function (err) {
    if (err) {
        console.error("Error writing combinations to file:", err);
    }
    else {
        console.log("Combinations have been written to combinations.json");
    }
});
