import React, {useState} from 'react';
import Creatable from 'react-select/creatable';
import {UseFormRegister} from 'react-hook-form';
import {Form} from 'react-bootstrap';

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
    onCreate?: (val: string) => void
}

const defaultFontSize: string = '1.075rem !important';

const FormReactSelectCreatable: React.FC<ComponentProps> = ({
                                                                options = [],
                                                                onChange,
                                                                isClearable = true,
                                                                hint = '',
                                                                error,
                                                                identificator,
                                                                value = '',
                                                                register,
                                                                setValue,
                                                                label,
                                                                required = false,
                                                                onCreate,
                                                            }) => {
    const [inValue, setInValue] = useState<any>(value);

    const onCreateOption = (e: string) => {
        if (onCreate) {
            onCreate(e);
        }
        if (setValue && options) {
            setInValue(e);
            options.push({label: e, value: e});
        }
    }

    const onChangeValue = (e: any) => {
        const value = e ? e.value : null;
        setInValue(value);
        if (onChange) {
            onChange(value);
        }
        if (setValue) {
            setValue(identificator, e ? e.value : '');
        }
    }

    const styles = {
        control: (baseStyles: any) => ({
            ...baseStyles,
            backgroundColor: 'var(--kt-input-solid-bg)',
            border: '1px solid var(--kt-input-solid-bg)',
            boxShadow: 'box-shadow: none !important;',
            fontSize: defaultFontSize
        }),
        menuList: (baseStyles: any) => ({
            ...baseStyles,
            fontSize: defaultFontSize
        })
    }

    return (
        <>
            {label && <label className={'mb-2'}>{label} {required && <span className="text-danger">*</span>}</label>}
            <Creatable
                onCreateOption={onCreateOption}
                styles={styles}
                onChange={onChangeValue}
                options={options}
                isClearable={isClearable}
                isSearchable
                placeholder={'------'}
                value={options?.filter(opt => opt.value === inValue)}
            />
            <Form.Control type={'text'} hidden={true} placeholder="----"  {...register ? register(identificator) : null}
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
    );
}

export default FormReactSelectCreatable;
