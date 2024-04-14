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

export const extractMeasures = (
  data: {
    key: string;
    value: number;
  }[],
  article: string
) => {
  const measuresMap: Map<string, number[]> = new Map();
  let combinations =
    data?.filter(
      (record: { key: string; value: number }) =>
        !record.key.indexOf(transformToSnakeCase(article) + "#")
    ) ?? [];
  if (combinations.length === 0) {
    return [
      { name: "UNITS", values: new Array(5).fill(0) },
      { name: "UNIT_PRICE", values: new Array(5).fill(0) },
      { name: "GROSS_REVENUE", values: new Array(5).fill(0) },
    ];
  }
  for (let combination of combinations) {
    const [, , measureName] = combination.key.split("#");
    if (!measuresMap.has(measureName)) {
      measuresMap.set(measureName, []);
    }
    measuresMap.get(measureName)?.push(combination.value);
  }

  const measureData = Array.from(measuresMap.entries()).map(
    ([name, values]) => ({ name, values })
  );
  return measureData;
};
