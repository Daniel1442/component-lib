import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import {Form} from 'react-bootstrap';
import {UseFormRegister, UseFormSetValue} from 'react-hook-form';
import {formatDate} from '../../../helper/dateHelper';
import Calendar from 'react-calendar';
import {useOutsideAlerter} from '../../../utils/hooks/useOutsideAlerter';
import ClearCross from '../../../common/components/form/clearCross';
import moment from 'moment';
import {getWindowDimensions} from '../../../helper/commonHelper';
import {EMPTY} from '../models/enums';
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
    type?: string | undefined,
    date: Date | null,
    selectDate: (date: Date) => void,
    labelClass?: string | undefined,
    inputClass?: string | undefined,
    nullable?: boolean
    allowPast?: boolean,
    setValue?: UseFormSetValue<any>
}

const FormDatePicker: React.FC<ComponentProps> = ({
                                                      register,
                                                      identificator,
                                                      error,
                                                      label,
                                                      hint,
                                                      required = false,
                                                      disabled = false,
                                                      date,
                                                      selectDate,
                                                      labelClass = 'mb-2',
                                                      inputClass,
                                                      nullable = false,
                                                      allowPast = false,
                                                      setValue: setFormDateValue
                                                  }) => {

    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [value, setValue] = useState<string>(date == null ? 'dd. MM. yyyy' : formatDate(date.toDateString(), 'dd. MM. yyyy') as string);
    const [changeValue, setChangeValue] = useState<string | null>();

    // TODO HACK, pls better solution
    const ref = useRef<any>(null);
    const {outsideAlerter} = useOutsideAlerter();
    outsideAlerter(ref, setShowPicker);

    useEffect(() => {
        if (!date) {
            setValue('dd. MM. yyyy')
            return
        }

        setValue(formatDate(date.toDateString(), 'dd. MM. yyyy') as string);
    }, [date, disabled])

    useEffect(() => {
        if (!disabled || !value || !setFormDateValue) {
            return
        }

        setFormDateValue(identificator, value)

    }, [disabled])

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

    return <div key={identificator}>

        <label className={labelClass}>{label} {required && <span className="text-danger">*</span>}</label>
        <div className={'position-relative'}>
            {!register ? <Form.Control
                    type={'text'}
                    placeholder={EMPTY}
                    disabled={disabled}
                    value={value}
                    className={inputClass}
                    onClick={() => {
                        if (disabled) {
                            return
                        }
                        setShowPicker(!showPicker)
                    }}

                    onChange={(e: any) => {
                        const d = moment(e.target.value as string, 'DD. MM. yyyy');
                        setValue(e.target.value)

                        if (d.isValid() && d.isAfter(new Date())) {
                            selectDate(d.toDate());
                        }
                    }
                    }/>
                : <Form.Control type={'text'}
                                placeholder={EMPTY}
                                {...register ? register(identificator) : null}
                                disabled={disabled}
                                onClick={() => {
                                    if (disabled) {
                                        return
                                    }
                                    setShowPicker(!showPicker)
                                }}
                                defaultValue={value}
                                className={inputClass}
                                onChange={(e: any) => {
                                    const d = moment(e.target.value as string, 'DD. MM. yyyy');

                                    if (d.isValid() && d.isAfter(new Date())) {
                                        selectDate(d.toDate());
                                        if (setFormDateValue) {
                                            setFormDateValue(identificator, formatDate(d.toDate().toDateString(), 'dd. MM. yyyy'));
                                        }
                                    }
                                }
                                }/>}
            {nullable && date &&
                <ClearCross onClick={() => {
                    // @ts-ignore
                    selectDate(null)
                    if (setFormDateValue) {
                        setFormDateValue(identificator, 'dd. MM. yyyy')
                    }
                }}/>
            }
        </div>
        {showPicker && (
            <ModalWrapper hAuto={true} headerText={'Vyberte datum'} hideModal={() => setShowPicker(false)}>
                <div className={'modal-content'}>
                    <div className={'datePicker mx-auto'}>
                        <Calendar
                            value={date}
                            defaultValue={date as Date}
                            onChange={(d: any) => {
                                selectDate(d);
                                if (setFormDateValue) {
                                    setFormDateValue(identificator, formatDate(d.toDateString(), 'dd. MM. yyyy'));
                                    return
                                }
                                if (register) {
                                    register(identificator).onChange(d)
                                }
                            }}
                            minDate={allowPast ? undefined : new Date()}
                            minDetail={'month'}
                        />

                    </div>
                    <div className={'modal-footer justify-content-center'}>
                        <button className={'btn btn-sm btn-primary mt-4 w-250px'} onClick={() => setShowPicker(!showPicker)}>
                            Uložit
                        </button>
                </div>
                </div>
            </ModalWrapper>
        )}
        {error && (
            <div className={'invalid-feedback'} style={error ? {display: 'block'} : {}}>
                {error?.message}
            </div>
        )}
        <input hidden={true}  {...register ? register(identificator) : null} />
        {!error && hint && (
            <div className="form-text text-muted">{hint}</div>
        )}
    </div>;
}

export default FormDatePicker;