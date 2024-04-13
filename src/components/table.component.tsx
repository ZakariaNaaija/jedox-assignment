import { useState } from "react";

import "./Table.css";
import Row from "./row.component.tsx";
import Column from "./column.component";

interface TableProps {
  rows: any;
  columns: any;
  data: any;
  className: string;
}

const Table: React.FC<TableProps> = ({ columns, rows, data, className }) => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set<number>([0]));

  return (
    <>
      <table className={className}>
        <thead>
          <tr>
            <th colSpan={2}></th>
            {columns.map((column: any, index: number) => (
              <Column
                key={index}
                region={column}
                level={0}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any, index: number) => (
            <Row
              key={index}
              row={row}
              level={0}
              expanded={expanded}
              data={data}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
