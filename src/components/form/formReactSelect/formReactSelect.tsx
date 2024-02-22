import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {UseFormRegister} from 'react-hook-form';
import {Form} from 'react-bootstrap';
import {EMPTY} from "../../../models/enums";

interface ComponentProps {
    options?: any[],
    onChange?: (value: any) => void,
    isClearable?: boolean
    label?: string | null,
    hint?: string | null,
    identificator: string,
    register?: UseFormRegister<any>,
    error?: any | null,
    required?: boolean | null,
    disabled?: boolean | undefined,
    value?: any | undefined,
    textAlign?: string | undefined,
    empty?: boolean | undefined,
    setValue?: (indetificator: any, value: string) => void
    isSearchable?: boolean
    specificValue?: any
    className?:string
}

const FormReactSelect: React.FC<ComponentProps> = ({
                                                       options,
                                                       onChange,
                                                       isClearable = true,
                                                       hint,
                                                       error,
                                                       identificator,
                                                       value,
                                                       register,
                                                       setValue,
                                                       label,
                                                       required,
                                                       disabled = false,
                                                       isSearchable = true,
                                                       specificValue,
                                                       className
                                                   }) => {
    const [inValue, setInValue] = useState<any>(value);
    useEffect(() => {

        if (setValue && identificator) {
            setValue(identificator, value)
        }

        if (value === inValue) {
            return
        }

        setInValue(value)


    }, [value])

    return <>
        {label && <label className={'mb-2'}>{label} {required && <span className="text-danger">*</span>}</label>}
        <Select
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
            onChange={(e) => {
                setInValue(e ? e.value : null)
                if (onChange) {
                    onChange(e ? e.value : null)

                }
                if (setValue) {
                    setValue(identificator, e ? e.value : '')
                }
            }}
            options={options}
            isClearable={isClearable}
            isSearchable={isSearchable}
            placeholder={EMPTY}
            isDisabled={disabled}
            className={className}
            value={options?.filter(opt => opt.value === (specificValue ? specificValue : inValue))}
        />
        <Form.Control type={'text'} hidden={true} placeholder={EMPTY}  {...register ? register(identificator) : null}
                      defaultValue={value}/>
        {hint && error && (
            <div className={'invalid-feedback'} style={error ? {display: 'block'} : {}}>
                {error?.message}
            </div>
        )}
        {!error && hint && (
            <div className="form-text text-muted">{hint}</div>
        )}
    </>
}

export default FormReactSelect;
