import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import Switch from "react-switch";

import jsonData from "./utils/data.json";
import Table from "./components/table.component";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [checked, setChecked] = useState(false);

  const [legalEntity, setLegalEntity] = useState<{
    value: string;
    label: string;
  }>({ value: "11", label: "11" });

  const [version, setVersion] = useState<{
    value: string;
    label: string;
  }>({ value: "ACTUAL", label: "ACTUAL" });

  const [currency, setCurrency] = useState<{
    value: string;
    label: string;
  }>({ value: "LC", label: "LC" });

  const table = {
    columns: [
      {
        name: "Europe",
        id: 0,
        children: [
          {
            name: "Germany",
            id: 1,
            children: [
              {
                name: "Freiburg",
                id: 2,
              },
              {
                name: "Berlin",
                id: 3,
              },
            ],
          },
          {
            name: "Great Britain",
            id: 4,
            children: [],
          },
        ],
      },
    ],
    rows: [
      {
        name: "All articles",
        children: [
          {
            name: "Bikes",
            children: [
              {
                name: "Mountain Bikes",
              },
            ],
          },
          {
            name: "Product",
            children: [
              {
                name: "Product A",
              },
            ],
          },
        ],
      },
    ],
    filters: {
      version: [
        { value: "ACTUAL", label: "ACTUAL" },
        { value: "BUDGET", label: "BUDGET" },
      ],
      legal_entity: [
        { value: "ALL_ENTITIES", label: "ALL_ENTITIES" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
      ],
      currency: [
        { value: "LC", label: "LC" },
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
      ],
    },
  };

  const filterData = useCallback(async () => {
    const loadedData = JSON.stringify(jsonData);
    const json = JSON.parse(loadedData);
    setData(json[`${legalEntity.value}#${version.value}#${currency.value}`]);
  }, [currency.value, legalEntity.value, version.value]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  return (
    <>
      <Switch
        onChange={setChecked}
        checked={checked}
        checkedIcon={false}
        uncheckedIcon={false}
      />

      <div className="filter-section">
        <Select
          defaultValue={version}
          className="react-select-container"
          options={table.filters.version}
          onChange={(e) => {
            setVersion({ label: e?.label ?? "", value: e?.value ?? "" });
            filterData();
          }}
        />
        <Select
          defaultValue={legalEntity}
          className="react-select-container"
          options={table.filters.legal_entity}
          onChange={(e) => {
            setLegalEntity({ label: e?.label ?? "", value: e?.value ?? "" });
            filterData();
          }}
        />
        <Select
          defaultValue={currency}
          className="react-select-container"
          options={table.filters.currency}
          onChange={(e) => {
            setCurrency({ label: e?.label ?? "", value: e?.value ?? "" });
            filterData();
          }}
        />
      </div>

      <Table
        columns={table.columns}
        rows={table.rows}
        className={checked ? "zebra" : "plain"}
        data={data}
      />
    </>
  );
};

export default App;
