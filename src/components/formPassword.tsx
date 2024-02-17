import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import {UseFormRegister} from 'react-hook-form';
import {EMPTY} from "../models/enums";

interface ComponentProps {
    label?: string | null,
    hint?: string | null,
    identificator: string,
    register?: UseFormRegister<any>,
    error?: any | null,
    required?: boolean | null,
    disabled?: boolean | undefined,
    value?: any,
    type?: string | undefined
    onChange?: (e: any) => void | null,
    textAlign?: string | undefined
}

const FormPassword: React.FC<ComponentProps> = ({
                                                    register,
                                                    identificator,
                                                    error,
                                                    label,
                                                    hint,
                                                    required = false,
                                                    disabled = false,
                                                    value,
                                                    onChange,
                                                    textAlign
                                                }) => {
    const [showPassword, setShowPassword] = useState(false)

    const onChangeAll = (e: any) => {
        if (register) {
            register(identificator).onChange(e)
        }
        if (onChange) {
            onChange(e)
        }
    }


    return <div className={'position-relative'}>
        {label && <label className={'mb-2'}>{label} {required && <span className="text-danger">*</span>}</label>}
        <Form.Control type={showPassword ? 'text' : 'password'}
                      placeholder={EMPTY}
                      className={(textAlign ? textAlign : 'text-start ') + (error ? ' border-danger' : ' ')}
                      disabled={disabled}
                      defaultValue={value}
                      {...register ? register(identificator) : null}
                      onChange={onChangeAll}
        />
        <span style={{width: '25px', height: '25px', top: '40px', right: 0}}
              onClick={() => setShowPassword(!showPassword)}
              className="icon-eye d-block position-absolute"/>
        {hint && error && (
            <div className={'invalid-feedback'} style={error ? {display: 'block'} : {}}>
                {error?.message}
            </div>
        )}
        {!error && hint && (
            <div className="form-text text-muted">{hint}</div>
        )}
    </div>;
}

export default FormPassword;