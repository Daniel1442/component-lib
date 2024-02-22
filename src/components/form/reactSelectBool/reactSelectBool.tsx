import React from "react";
import ReactSelect from "../reactSelect/reactSelect";

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

    let transformOptions = (options: any) => {
        return options.map((value: any) => {
            return { value: value.value, label: value.label };
        });
    };

    let getOptionValue = (e: any, noneValue: any) => {
        return e == null ? noneValue === undefined ? "none" : noneValue : e?.value;
    };

    let optValue = transformOptions(options);

    return (
        <ReactSelect
            options={optValue}
            onChange={(e) =>
                setFilterOptions({
                    ...filterOptions,
                    [identification]: getOptionValue(e, noneValue),
                })
            }
            defaultValue={defaultValue}
        />
    );
};

export default ReactSelectBool;
