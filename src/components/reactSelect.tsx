import React from "react";
import Select from "react-select";
import {EMPTY} from "../models/enums";

interface ComponentProps {
    options?: any[],
    onChange: (value: any) => void,
    defaultValue?: any | null
    isClearable?:boolean
    isSearchable?:boolean

}

const ReactSelect: React.FC<ComponentProps> = ({options, onChange, defaultValue,isClearable=true,isSearchable=true}) => {
    return <Select
        styles={{
            // @ts-ignore
            control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: 'var(--kt-input-solid-bg)',
                border: '1px solid var(--kt-input-solid-bg)',
                boxShadow: '    box-shadow: none !important;',
                fontSize: '1.075rem !important'
            }),
            // @ts-ignore
            menuList: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: '1.075rem !important'

            })
        }}
        onChange={onChange}
        options={options?.sort((a, b) => a.label > b.label ? 1 : -1)}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={EMPTY}
        value={options?.filter(opt => opt.value === defaultValue)}
    />;
}

export default ReactSelect;
