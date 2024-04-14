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

export const extractMeasures = (combinations: any) => {
  const measuresMap: Map<string, number[]> = new Map();

  // Group values by measure name
  combinations?.forEach(({ key, value }: { key: string; value: number }) => {
    const [,, measureName] = key.split("#");
    if (!measuresMap.has(measureName)) {
      measuresMap.set(measureName, []);
    }
    measuresMap.get(measureName)?.push(value);
  });

  // Create an array of MeasureData objects
  const measureData = Array.from(measuresMap.entries()).map(
    ([name, values]) => ({ name, values })
  );

  return measureData;
};
