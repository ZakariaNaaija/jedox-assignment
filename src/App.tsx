import { useCallback, useEffect, useState } from "react";

import jsonData from "./utils/data.json";
import tableStructure from "./utils/table-structure.json";
import Table, { TableStructure } from "./components/table.component";
import "./App.css";

export interface TableData {
  [key: string]: { key: string; value: number }[];
}

const App = () => {
  const [tableData, setTableData] = useState<TableData>({});
  const [tableStructureData, setTableStructure] = useState<TableStructure>({
    columns: [],
    rows: [],
    filters: [],
  });

  const fetchData = useCallback(async () => {
    const loadedTableData = JSON.stringify(jsonData);
    const tabledataJson = JSON.parse(loadedTableData);
    const loadedTableStructure = JSON.stringify(tableStructure);
    const tableStructureJson = JSON.parse(loadedTableStructure);

    setTableData(tabledataJson);
    setTableStructure(tableStructureJson);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Table
        columns={tableStructureData.columns}
        rows={tableStructureData.rows}
        filters={tableStructureData.filters}
        data={tableData}
      />
    </>
  );
};

export default App;
