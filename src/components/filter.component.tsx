import Select, {
  components,
} from "react-select";

export interface Filters {
  [key: string]: any;
}

interface SelectOption {
  value: string;
  label: string;
}

interface FilterProps {
  options: Filters;
  filterData: () => void;
  version: SelectOption;
  currency: SelectOption;
  legalEntity: SelectOption;
  setVersion: React.Dispatch<React.SetStateAction<SelectOption>>;
  setLegalEntity: React.Dispatch<React.SetStateAction<SelectOption>>;
  setCurrency: React.Dispatch<React.SetStateAction<SelectOption>>;
}

const FilterComponent: React.FC<FilterProps> = ({
  options,
  filterData,
  version,
  setVersion,
  legalEntity,
  setLegalEntity,
  currency,
  setCurrency,
}) => {
  const ControlComponent = (props: any) => (
    <div>
      <p>{props.selectProps.customPlaceholder}</p>
      <components.Control {...props} />
    </div>
  );

  return (
    <div className="filter-section">
      <Select
        defaultValue={version}
        className="react-select-container"
        options={options.version}
        // @ts-ignore
        customPlaceholder="Version: "
        components={{ Control: ControlComponent }}
        onChange={(e) => {
          setVersion({ label: e?.label ?? "", value: e?.value ?? "" });
          filterData();
        }}
      />
      <Select
        defaultValue={legalEntity}
        className="react-select-container"
        options={options.legal_entity}
        // @ts-ignore
        customPlaceholder="Legal Entity: "
        components={{ Control: ControlComponent }}
        onChange={(e) => {
          setLegalEntity({ label: e?.label ?? "", value: e?.value ?? "" });
          filterData();
        }}
      />
      <Select
        defaultValue={currency}
        className="react-select-container"
        options={options.currency}
        // @ts-ignore
        customPlaceholder="Currency: "
        components={{ Control: ControlComponent }}
        onChange={(e) => {
          setCurrency({ label: e?.label ?? "", value: e?.value ?? "" });
          filterData();
        }}
      />
    </div>
  );
};

export default FilterComponent;
