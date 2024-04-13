import React, { useMemo, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import {
  transformData,
  transformToSnakeCase,
  transformToTitleCase,
} from "../utils/transforms.util";

interface RowProps {
  row: any;
  data: any;
  level: number;
  expanded: Set<number>;
}

const Row: React.FC<RowProps> = ({ row, level, expanded, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    if (
      !row.children ||
      !Array.isArray(row.children) ||
      row.children.length === 0
    ) {
      return;
    }
    setIsExpanded((prev) => !prev);
  };

  const rowData = useMemo(() => {
    return transformData(
      data?.filter(
        (dataRecord: { key: string; value: number }) =>
          !dataRecord.key.indexOf(transformToSnakeCase(row.name))
      )
    );
  }, [data, row.name]);

  return (
    <>
      {rowData.map((value: any, index: number) => {
        if (index !== 0) {
          return (
            <tr key={index}>
              <td></td>
              <td key={index}>{transformToTitleCase(value.name)} </td>
              {value.values.map((val: string, index: number) => {
                if (expanded.has(index)) {
                  return <td key={val}>{val}</td>;
                }
                return null;
              })}
            </tr>
          );
        }
        return (
          <tr key={index}>
            <td
              onClick={toggleExpand}
              className="expandable"
              style={{ paddingLeft: `${level * 20}px` }}
            >
              {" "}
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              {row.name}
            </td>
            <td key={0}> {transformToTitleCase(value.name)}</td>
            {value.values.map((val: string, index: number) => {
              if (expanded.has(index)) {
                return <td key={val}>{val}</td>;
              }
              return null;
            })}
          </tr>
        );
      })}

      {isExpanded &&
        row.children &&
        row.children.length > 0 &&
        row.children.map((value: any, index: number) => (
          <Row
            key={index}
            row={value}
            level={level + 1}
            expanded={expanded}
            data={data}
          />
        ))}
    </>
  );
};

export default Row;
