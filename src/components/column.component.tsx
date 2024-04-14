import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface Column {
  name: string;
  id: number;
  children?: Column[];
}

interface ColumnProps {
  column: Column;
  setExpanded: React.Dispatch<React.SetStateAction<Set<number>>>;
  expanded: Set<number>;
  level: number;
}

const ColumnComponent: React.FC<ColumnProps> = ({
  column,
  level,
  setExpanded,
  expanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const loopChildren = (column: Column, newExpanded: Set<number>) => {
    if (column.children)
      for (let child of column.children) {
        newExpanded.delete(child.id);
        loopChildren(child, newExpanded);
      }
  };

  const onClick = () => {
    if (
      !column.children ||
      !Array.isArray(column.children) ||
      column.children.length === 0
    )
      return;
    setIsExpanded((prev) => {
      const newExpanded = new Set(expanded);
      if (!prev) {
        newExpanded.add(column.id);
        if (column.children) {
          for (let child of column.children) {
            newExpanded.add(child.id);
          }
        }
      } else {
        loopChildren(column, newExpanded);
      }
      setExpanded(newExpanded);

      return !prev;
    });
  };

  return (
    <>
      <th onClick={onClick}>
        {column.name} {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </th>
      {isExpanded && column.children && column.children.length > 0 && (
        <>
          {column.children.map((child: any, index: number) => (
            <ColumnComponent
              key={index}
              level={level + 1}
              column={child}
              setExpanded={setExpanded}
              expanded={expanded}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ColumnComponent;
