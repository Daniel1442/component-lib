import React from "react";
import ReactSelect from "./reactSelect";

interface ComponentProps {
  setFilterOptions: (value: unknown) => void;
  filterOptions?: any | null;
  defaultValue?: any | null;
  identification?: string;
  noneValue?: string | null;
}

const options: { value: string; label: string }[] = [
  { value: "true", label: "ANO" },
  { value: "false", label: "NE" },
];

const ReactSelectBool: React.FC<ComponentProps> = ({
  setFilterOptions,
  filterOptions,
  defaultValue,
  identification = "active",
  noneValue = "none",
}) => {
  return (
    <ReactSelect
      options={options.map((value) => {
        return { value: value.value, label: value.label };
      })}
      onChange={(e) =>
        setFilterOptions({
          ...filterOptions,
          [identification]:
            e == null
              ? noneValue === undefined
                ? "none"
                : noneValue
              : e?.value,
        })
      }
      defaultValue={defaultValue}
    />
  );
};

export default ReactSelectBool;
