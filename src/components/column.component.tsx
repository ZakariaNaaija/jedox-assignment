import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface Column {
  name: string;
  id: number;
  children?: Column[];
}

interface ColumnProps {
  column: Column;
  setExpandedColumns: React.Dispatch<React.SetStateAction<Set<number>>>;
  expandedColumns: Set<number>;
}

const ColumnComponent: React.FC<ColumnProps> = ({
  column,
  setExpandedColumns,
  expandedColumns,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const collapseChildrens = (column: Column, newExpanded: Set<number>) => {
    if (column.children)
      for (let child of column.children) {
        newExpanded.delete(child.id);
        collapseChildrens(child, newExpanded);
      }
  };

  const toggleExpand = () => {
    if (
      !column.children ||
      !Array.isArray(column.children) ||
      column.children.length === 0
    ) {
      return;
    }

    setIsExpanded((prevValue) => {
      const newExpandedColumns = new Set(expandedColumns);
      if (!prevValue) {
        newExpandedColumns.add(column.id);
        if (column.children) {
          for (let child of column.children) {
            newExpandedColumns.add(child.id);
          }
        }
      } else {
        collapseChildrens(column, newExpandedColumns);
      }
      setExpandedColumns(newExpandedColumns);
      return !prevValue;
    });
  };

  return (
    <>
      <th onClick={toggleExpand} className="expandable">
        {column.name} {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </th>
      {isExpanded && column.children && column.children.length > 0 && (
        <>
          {column.children.map((child: Column, index: number) => (
            <ColumnComponent
              key={index}
              column={child}
              setExpandedColumns={setExpandedColumns}
              expandedColumns={expandedColumns}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ColumnComponent;
