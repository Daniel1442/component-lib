import React, {useEffect, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';
import {EMPTY} from "../models/enums";
import PhoneInput from "react-phone-input-2";

interface ComponentProps {
    label?: string | null,
    hint?: string | boolean | null,
    identificator: string,
    register?: UseFormRegister<any>,
    error?: any | null,
    required?: boolean | null,
    disabled?: boolean | undefined,
    value?: any,
    type?: string | undefined
    onChange?: (e: any) => void | null,
    textAlign?: string | undefined
    setValue: any
    trigger: any
}

const FormPhoneInput: React.FC<ComponentProps> = ({
                                                      register,
                                                      identificator,
                                                      error,
                                                      label,
                                                      hint,
                                                      required = false,
                                                      disabled = false,
                                                      value,
                                                      setValue,
                                                      trigger
                                                  }) => {
    const [numero, setNumero] = useState<string>(value);

    useEffect(() => {
        if (!value) {
            setNumero('+420')
            setValue(identificator,'')
            return
        }
        setValue(identificator, value.startsWith('+') ? value : `+${value}`)
        setNumero(value)

    }, [value])


    const handleOnChange = (val: any, data: any) => {

        if (val === data.dialCode) {
            setValue(identificator, undefined)
            trigger(identificator)
            return
        }

        setNumero(val)
        setValue(identificator, val ? `+${val}` : undefined)
        trigger(identificator)
    }

    return <>
        {label && <label className={'mb-2'}>{label} {required && <span className="text-danger">*</span>}</label>}
        <PhoneInput {...register}
                    country={'cz'}
                    onlyCountries={['cz', 'sk', 'de']}
                    placeholder={EMPTY}
                    inputClass={'text-start form-control w-100 h-45px lh-base'}
                    onChange={handleOnChange}
                    value={numero}
                    enableAreaCodes={false}
                    alwaysDefaultMask={true}
                    disabled={disabled}
                    autoFormat={true}
        />
        {hint && error && (
            <div className={'invalid-feedback'} style={error ? {display: 'block'} : {}}>
                {error?.message}
            </div>
        )}
        {!error && hint && (
            <div className="form-text text-muted">{hint}</div>
        )}
    </>;
}

export default FormPhoneInput;