import React from 'react';
import {Form} from 'react-bootstrap';
import {UseFormRegister} from 'react-hook-form';
import {EMPTY} from "../../../models/enums";

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
    textAlign?: string | undefined,
    className?: string | undefined
    autoComplete?: string
}

const FormInput: React.FC<ComponentProps> = ({
                                                 register,
                                                 identificator,
                                                 error,
                                                 label,
                                                 hint,
                                                 required = false,
                                                 disabled = false,
                                                 value,
                                                 type = 'text',
                                                 onChange,
                                                 textAlign,
                                                 className,
                                                 autoComplete
                                             }) => {

    const onChangeAll = (e: any) => {
        if (register) {
            register(identificator).onChange(e)
        }
        if (onChange) {
            onChange(e)
        }
    }

    return <>
        {label && <label className={'mb-2'}>{label} {required && <span className="text-danger">*</span>}</label>}
        <Form.Control type={type}
                      placeholder={EMPTY}
                      {...register ? register(identificator) : null}
                      className={`${(textAlign ? textAlign : 'text-start ') + (error ? ' border-danger' : ' ')} ${className && className} `}
                      disabled={disabled}
                      defaultValue={value}
                      autoComplete={autoComplete}
                      onChange={onChangeAll}
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

export default FormInput;