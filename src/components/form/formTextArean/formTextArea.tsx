import React from 'react';
import {Form} from 'react-bootstrap';
import {UseFormRegister} from 'react-hook-form';
import {EMPTY} from "../../../models/enums";

interface ComponentProps {
    label?: string | null,
    hint?: string | null,
    identificator: string,
    register?: UseFormRegister<any>,
    error?: any | null,
    required?: boolean | null,
    disabled?: boolean | undefined,
    value?: string | undefined | null,
    rows?: number | undefined,
}

const FormTextArea: React.FC<ComponentProps> = ({
                                                    register,
                                                    identificator,
                                                    error,
                                                    label,
                                                    hint,
                                                    required = false,
                                                    value,
                                                    rows = 3,
                                                    disabled = false
                                                }) => {

    // Extracted constant
    const LABEL_CLASS = 'mb-2';
    const FEEDBACK_CLASS = 'invalid-feedback';

    return <>
        <label className={LABEL_CLASS}>{label} {required && <span className="text-danger">*</span>}</label>
        <Form.Control as={'textarea'}
                      rows={rows}
                      placeholder={EMPTY}
                      {...register ? register(identificator) : null}
                      defaultValue={value as string | undefined}
                      disabled={disabled}/>
        {error ? (
            <div className={FEEDBACK_CLASS} style={{display: 'block'}}>
                {error.message} {/*use optional chaining*/}
            </div>
        ) : (
            <div className="form-text text-muted">{hint}</div>
        )}
    </>;
}

export default FormTextArea;