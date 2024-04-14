export const transformToTitleCase = (input: string): string => {
  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const transformToSnakeCase = (value: string): string => {
  return value.toUpperCase().replace(/\s+/g, "_");
};

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const REGIONS = ["EUROPE", "GERMANY", "FREIBURG", "BERLIN", "GREAT_BRITAIN"];

export const extractMeasures = (
  data: {
    key: string;
    value: number;
  }[],
  article: string
) => {
  const measuresMap: Map<string, number[]> = new Map([
    ["UNITS", new Array(5).fill(0)],
    ["UNIT_PRICE", new Array(5).fill(0)],
    ["GROSS_REVENUE", new Array(5).fill(0)],
  ]);
  let combinations =
    data?.filter(
      (record: { key: string; value: number }) =>
        !record.key.indexOf(transformToSnakeCase(article) + "#")
    ) ?? [];

  if (combinations.length !== 0) {
    let index = REGIONS.indexOf(combinations[0].key.split("#")[1]);
    let prevRegion = combinations[0].key.split("#")[1];

    for (let combination of combinations) {
      const [, region, measureName] = combination.key.split("#");
      if (region !== prevRegion) {
        prevRegion = region;
        index = REGIONS.indexOf(combination.key.split("#")[1]);
      }

      if (!measuresMap.has(measureName)) {
        measuresMap.set(measureName, []);
      }
      const measures = measuresMap.get(measureName);
      if (measures) measures[index] = combination.value;
    }
  }

  const measureData = Array.from(measuresMap.entries()).map(
    ([name, values]) => ({ name, values })
  );
  return measureData;
};
