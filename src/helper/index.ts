import {TimeValues} from "../components/formTimePicker.tsx";

export const translateToText = (val: TimeValues) => {
    return `${val.hour <= 9 ? '0' + val.hour : val.hour}:${val.minute <= 9 ? '0' + val.minute : val.minute}`;
}

export const getWindowDimensions = (): { width: number, height: number } => {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

