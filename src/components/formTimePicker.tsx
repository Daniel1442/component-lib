import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import {Form} from 'react-bootstrap';
import {UseFormRegister} from 'react-hook-form';
import {useOutsideAlerter} from '../../../utils/hooks/useOutsideAlerter';
import TimeValue from './timePicker/timeValue';
import {getWindowDimensions} from '../../../helper/commonHelper';
import {EMPTY} from "../models/enums";
import {translateToText} from "../../reservation/helper";
import ModalWrapper from "../../../common/components/wrapper/modalWrapper";

interface ComponentProps {
    label?: string | null,
    hint?: string | null,
    identificator: string,
    register?: UseFormRegister<any>,
    error?: any | null,
    required?: boolean | null,
    disabled?: boolean | undefined,
    value?: string | undefined,
    values: TimeValues,
    setValues: (values: TimeValues) => void
    step?: number
    inputClass?: string
    setValue?: any

}

export interface TimeValues {
    hour: number
    minute: number
}

const FormTimePicker: React.FC<ComponentProps> = ({
                                                      register,
                                                      identificator,
                                                      error,
                                                      label,
                                                      hint,
                                                      required = false,
                                                      disabled = false,
                                                      values,
                                                      setValues,
                                                      step = 1,
                                                      inputClass = '',
                                                      setValue
                                                  }) => {


    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [innerValue, setInnerValue] = useState(translateToText(values))

    // TODO HACK, pls better solution
    const ref = useRef<any>(null);
    const {outsideAlerter} = useOutsideAlerter();
    outsideAlerter(ref, setShowPicker);

    const computePosition = (): CSSProperties => {
        if (ref.current === null) {
            return {};
        }

        const location = ref.current.getBoundingClientRect();
        const window = getWindowDimensions();
        const absoluteHeight = location.top + 500;
        if (window.height > absoluteHeight) {
            return {}
        }

        if (window.height < 700) {
            return {top: '30vh', position: 'fixed'}
        }


        return {bottom: '250px'};
    };

    const changeDirect = (e: any) => {
        if (register && identificator) {
            register(identificator).onChange(e)
        }
        const value: string = e.target.value;

        setInnerValue(value)

        if (!value.includes(':')) {
            if (!identificator || !register || !setValue) {
                return
            }
            setValue(identificator, value)
            return
        }

        const splited = value.split(':')

        const minute = parseInt(splited[1])
        const hour = parseInt(splited[0])

        if (isNaN(hour) || isNaN(minute)) {
            return;
        }

        if (0 > minute || minute > 59) {
            return;
        }

        if (0 > hour || hour > 24) {
            return;
        }

        setValues({hour, minute})

    }


    useEffect(() => {
        if (!identificator || !register || !setValue) {
            return
        }
        setValue(identificator, translateToText(values))

    }, [values])


    return <div ref={ref}>
        <label className={'mb-2'}>{label} {required && <span className="text-danger">*</span>}</label>
        <Form.Control type={'text'}
                      placeholder={EMPTY}
                      {...register ? register(identificator) : null}
                      disabled={disabled}
                      onChange={changeDirect}
                      className={inputClass}
                      onClick={() => {
                          if (disabled) {
                              return
                          }
                          setShowPicker(!showPicker)
                      }}
                      value={innerValue}
        />

        {showPicker && (
            <div className={'datePicker datePicker-time'} style={computePosition()}>
                <div className={'datePicker__back'}/>
                <h5>Vyberte čas</h5>
                <div className={'datePicker__timeBoxes'}>
                    <TimeValue
                        value={values.hour}
                        maxValue={23}
                        setValue={(value: number, uptik: number) => {
                            const newValue = {
                                ...values,
                                hour: value
                            }
                            setValues(newValue)
                            setInnerValue(translateToText(newValue))
                        }}
                        title={'Hodiny'}
                        step={1}
                        minValue={0}
                    />
                    <TimeValue
                        value={values.minute}
                        maxValue={60 - step}
                        setValue={(value: number, uptik: number) => {
                            const newValue = {
                                minute: value,
                                hour: values.hour + uptik
                            }

                            setValues(newValue)
                            setInnerValue(translateToText(newValue))
                        }}
                        title={'Minuty'}
                        step={step}
                        minValue={0}
                    />
                </div>
                <button className={'btn btn-sm btn-primary mt-4'} onClick={() => setShowPicker(!showPicker)}>
                    Hotovo
                </button>
            </div>
        )}
        {error && (
            <div className={'invalid-feedback'} style={error ? {display: 'block'} : {}}>
                {error?.message}
            </div>
        )}
        {!error && (
            <div className="form-text text-muted">{hint}</div>
        )}
    </div>;
}


export default FormTimePicker;