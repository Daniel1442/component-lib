import React from 'react';

interface ComponentProps {
    value: number;
    maxValue: number;
    setValue: (value: number, uptik: number) => void;
    step: number;
    title: string;
    minValue?: number
}

const TimeValue: React.FC<ComponentProps> = ({value, maxValue, setValue, step, title, minValue = 0}) => {
    const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);

        if (val < 0) {
            setValue(maxValue, 0);
            return;
        }

        if (val > maxValue) {
            setValue(0, 0);
            return;
        }

        setValue(val, 0);
    };

    const setUp = () => {
        if (value + step > maxValue) {
            setValue(minValue, 1);
            return;
        }

        setValue((value += step), 0);
    };

    const setDown = () => {
        if (value - step < minValue) {
            setValue(maxValue, -1);
            return;
        }
        setValue((value -= step), 0);
    };

    return (
        <div>
            <div className={'datePicker__timeBoxes__innerBox'}>
                <span onMouseDown={setUp} className={'datePicker__timeBoxes__innerBox__arrow__Up'}/>
                <input className={'datePicker__timeBoxes__innerBox__value'} type={'number'}
                       value={value <= 9 ? '0' + value : value} onChange={setInput}/>
                <span onMouseDown={setDown} className={'datePicker__timeBoxes__innerBox__arrow__Down'}/>
            </div>
            <label className={'datePicker__timeBoxes__label'}>{title}</label>
        </div>
    );
};

export default TimeValue;
