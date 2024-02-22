import React from "react";
import {Form} from "react-bootstrap";
import {UseFormRegister} from "react-hook-form";
import {EMPTY} from "../../../models/enums";

interface ComponentProps {
    label?: string | null;
    hint?: string | null;
    identificator: string;
    register?: UseFormRegister<any>;
    error?: any | null;
    required?: boolean | null;
    textAlign?: string;
    options?: Option[];
    disabled?: boolean;
    value?: any;
    onChange?: (val: any) => void;
    empty?: boolean;
}
const FormSelect: React.FC<ComponentProps> = ({
                                                  register,
                                                  identificator, // Identifier is more common
                                                  error,
                                                  label,
                                                  hint,
                                                  options = [],
                                                  required = false,
                                                  disabled = false,
                                                  value,
                                                  onChange,
                                                  textAlign,
                                                  empty = true
                                              }) => {
    const onChangeAll = (e: any) => {
        if (register) {
            register(identificator).onChange(e)
        }
        if (onChange) {
            onChange(e)
        }
    }
    return (
        <>
            {label && <label className={"mb-2"}>{label} {required && <span className="text-danger">*</span>}</label>}
            <Form.Select aria-label="Default select example"  {...register ? register(identificator) : null}
                         disabled={disabled} defaultValue={value} value={disabled ? value : undefined} onChange={onChangeAll}
                         className={(textAlign ? textAlign : "text-start ") + (error ? " border-danger" : " ")}>
                {empty && <option value="">{EMPTY}</option>}
                // Use destructuring for 'title' and 'value'
                {options.map(({ title, value }) => <option value={value}>{title}</option>)}
            </Form.Select>
            {error && hint && <div className='invalid-feedback' style={error ? { display: 'block' } : {}}>{error?.message}</div>}
            {!error && hint && <div className="form-text text-muted">{hint}</div>}
        </>
    );
}

export default FormSelect;