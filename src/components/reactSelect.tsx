import React from "react";
import Select from "react-select";

type OptionType = {
    value: string | number;
    label: string;
}

type OnChangeType = (selectedOption: OptionType | null) => void;

interface ComponentProps {
    options?: OptionType[],
    onChange: OnChangeType,
    defaultValue?: string | number | null,
    isClearable?: boolean,
    isSearchable?: boolean,
}

const getCustomStyles = () => ({
    control: (baseStyles: any) => ({
        ...baseStyles,
        backgroundColor: 'var(--kt-input-solid-bg)',
        border: '1px solid var(--kt-input-solid-bg)',
        boxShadow: 'none !important',
        fontSize: '1.075rem !important'
    }),
    menuList: (baseStyles: any) => ({
        ...baseStyles,
        fontSize: '1.075rem !important'
    })
})

const ReactSelect: React.FC<ComponentProps> = ({options, onChange, defaultValue, isClearable = true, isSearchable = true}) => {
    return (
        <Select
            styles={getCustomStyles()}
            onChange={onChange}
            options={options?.sort((a, b) => a.label > b.label ? 1 : -1)}
            isClearable={isClearable}
            isSearchable={isSearchable}
            placeholder={""}
            value={options?.filter(opt => opt.value === defaultValue)}
        />
    );
};

export default ReactSelect;
