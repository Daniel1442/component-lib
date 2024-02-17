import React, {useEffect, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';
import {Form} from 'react-bootstrap';
import {useConfiguration} from '../../../configuration/useConfiguration';
import {EMPTY} from "../models/enums";

interface ComponentProps {
    label?: string | null,
    hint?: string | null,
    identificator: string,
    register?: UseFormRegister<any>,
    error?: any | null,
    required?: boolean | null,
    disabled?: boolean | undefined,
    value?: string | undefined | number,
    type?: string | undefined
    setValue: (e: any, e2: any) => void
    onChange?: (e: any) => void | null
}

const FormImageInput: React.FC<ComponentProps> = ({
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
                                                      setValue

                                                  }) => {
    const [selectedFile, setSelectedFile] = useState<File | undefined>()
    const [preview, setPreview] = useState<string | undefined>()
    const [onHover, setOnHover] = useState(false);
    const {cdnUrl} = useConfiguration();

    const selectFile = (e: any) => {

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }


    const getBase64 = (file: any) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
        });
    }

    const getImagePreview = (): string => {
        if (preview) {
            return preview;
        }

        if (value) {
            return `${cdnUrl}${value}`;
        }

        return '';
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            setValue(undefined, undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        getBase64(selectedFile).then((data: any) => setValue(data.split(',')[1], selectedFile.name))
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    return <>
        <label className={'mb-2'}>{label} {required && <span className="text-danger">*</span>}</label>
        <div className={'position-relative  form-control overflow-hidden d-flex justify-content-between align-items-center'}
             onMouseEnter={() => setOnHover(true)}
             onMouseLeave={() => setOnHover(false)}>
            <div className={'btn btn-sm btn-success'}>Vložit obrázek</div>
            <input className={'position-absolute top-0 bottom-0 start-0 end-0 opacity-0'}
                   style={{zIndex: 999, cursor: 'pointer'}}
                   type={'file'}
                   accept={'image/png, image/jpeg'}
                   onChange={selectFile}/>
            {(selectedFile || value) &&
                <>
                    {selectedFile && selectedFile.name}
                    {(value && selectedFile == null) && value}
                </>
            }
        </div>
        <Form.Control type={type} hidden={true} placeholder={EMPTY}  {...register ? register(identificator) : null}
                      disabled={disabled} defaultValue={value} onChange={onChange ? onChange : undefined}/>
        {error && (
            <div className={'invalid-feedback'} style={error ? {display: 'block'} : {}}>
                {error?.message}
            </div>
        )}
        {!error && (
            <div className="form-text text-muted">{hint}</div>
        )}
    </>;
}

export default FormImageInput;