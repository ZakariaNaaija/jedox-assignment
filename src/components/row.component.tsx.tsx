import React, { useMemo, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import {
  extractMeasures,
  transformToSnakeCase,
  transformToTitleCase,
} from "../utils/transforms.util";

export interface Row {
  name: string;
  children?: Row[];
}

interface RowProps {
  row: Row;
  data: { key: string; value: number }[];
  level: number;
  expandedColumns: Set<number>;
}

const RowComponent: React.FC<RowProps> = ({
  row,
  level,
  expandedColumns,
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (
      !row.children ||
      !Array.isArray(row.children) ||
      row.children.length === 0
    ) {
      return;
    }
    setIsExpanded((prevValue) => !prevValue);
  };

  const measures = useMemo(
    () => extractMeasures(data, row.name),
    [data, row.name]
  );

  console.log(expandedColumns);
  return (
    <>
      {measures.map(
        (measure: { name: string; values: number[] }, index: number) => (
          <tr key={index}>
            {index === 0 ? (
              <td
                onClick={toggleExpand}
                className="expandable"
                style={{ paddingLeft: `${level * 20 + 10}px` }}
              >
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />} {row.name}
              </td>
            ) : (
              <td></td>
            )}
            <td>{transformToTitleCase(measure.name)} </td>
            {measure.values.map((value: number, _index: number) => {
              if (expandedColumns.has(_index)) {
                return <td key={index + _index}>{value}</td>;
              }
              return null;
            })}
          </tr>
        )
      )}

      {isExpanded &&
        row.children &&
        row.children.length > 0 &&
        row.children.map((child: Row, index: number) => (
          <RowComponent
            key={index}
            row={child}
            level={level + 1}
            expandedColumns={expandedColumns}
            data={data}
          />
        ))}
    </>
  );
};

export default RowComponent;
