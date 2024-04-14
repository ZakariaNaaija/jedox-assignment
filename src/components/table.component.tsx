import { useCallback, useEffect, useState } from "react";
import Switch from "react-switch";

import "./Table.css";
import ColumnComponent, { Column } from "./column.component";
import FilterComponent, { Filters } from "./filter.component";
import { TableData } from "../App";
import RowComponent, { Row } from "./row.component.tsx";

export interface TableStructure {
  columns: Column[];
  rows: Row[];
  filters: Filters;
}

interface TableProps {
  rows: Row[];
  columns: Column[];
  data: TableData;
  filters: Filters;
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  rows,
  data,
  filters,
}) => {
  const [filteredData, setFilteredData] = useState<
    { key: string; value: number }[]
  >([]);
  const [expandedColumns, setExpandedColumns] = useState<Set<number>>(new Set<number>([0]));
  const [checked, setChecked] = useState(false);
  const [legalEntity, setLegalEntity] = useState<{
    value: string;
    label: string;
  }>({ value: "11", label: "11" });

  const [version, setVersion] = useState<{
    value: string;
    label: string;
  }>({ value: "ACTUAL", label: "Actual" });

  const [currency, setCurrency] = useState<{
    value: string;
    label: string;
  }>({ value: "LC", label: "LC" });

  const filterData = useCallback(async () => {
    if (data) {
      setFilteredData(
        data[`${legalEntity.value}#${version.value}#${currency.value}`]
      );
    }
  }, [currency.value, data, legalEntity.value, version.value]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  return (
    <>
      <div className="table-options">
        <FilterComponent
          options={filters}
          filterData={filterData}
          version={version}
          setVersion={setVersion}
          currency={currency}
          setCurrency={setCurrency}
          legalEntity={legalEntity}
          setLegalEntity={setLegalEntity}
        />
        <label>
          <span>Turn on for Zebra style</span>
          <Switch
            onChange={setChecked}
            checked={checked}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </label>
      </div>

      <table className={checked ? "zebra" : "plain"}>
        <thead>
          <tr>
            <th colSpan={2}></th>
            {columns.map((column: Column, index: number) => (
              <ColumnComponent
                key={index}
                column={column}
                expandedColumns={expandedColumns}
                setExpandedColumns={setExpandedColumns}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: Row, index: number) => (
            <RowComponent
              key={index}
              row={row}
              level={0}
              expandedColumns={expandedColumns}
              data={filteredData}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableComponent;
