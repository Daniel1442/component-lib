import {format} from 'date-fns';

export const MINUTES_PER_HOUR: number = 60

export const getDateOfWeek = (day: number): string => {
    switch (day) {
        case 1:
            return 'common:dayOfWeek.mo';
        case 2:
            return 'common:dayOfWeek.tu';
        case 3:
            return 'common:dayOfWeek.we';
        case 4:
            return 'common:dayOfWeek.th';
        case 5:
            return 'common:dayOfWeek.fr';
        case 6:
            return 'common:dayOfWeek.sa';
        case 0:
            return 'common:dayOfWeek.su';
        case 7:
            return 'common:dayOfWeek.su';
        default:
            return 'common:dayOfWeek.day';
    }
};

export const isBetween = (check: any, from: any, to: any) => {
    if (!check) {
        return true
    }

    return getTime(from) <= getTime(check) && (to === '' || to == null || getTime(check) <= getTime(to))
}

function getTime(val: string | number | Date) {
    if (val instanceof Date) {
        return val.getTime();
    }

    return new Date(val).getTime()
}

export const getDefaultTime = () => {
    return new Date().toISOString().split('T')[0];
}

export const getYearDate = (year: number) => {
    return new Date(year, 0, 1).toLocaleDateString('sv')
}

export const getAtStartOfDay = () => {
    const date = new Date();
    date.setMinutes(0);
    date.setHours(0);
    return date;
}

export const initDate = (): Date => {
    const date = new Date();

    date.setMinutes(Math.floor(date.getMinutes() / 30) * 30);
    date.setHours(date.getHours());
    date.setMilliseconds(0);
    date.setSeconds(0);
    return date;
}

export const countMinutesBetween = (date1: string | Date, date2: string | Date): number => {

    const date1Inner = date1 instanceof Date ? date1 : new Date(date1)
    const date2Inner = date2 instanceof Date ? date2 : new Date(date2)
    const diffDate = date1Inner.getTime() - date2Inner.getTime()

    const diff: any = Math.abs(diffDate);
    return Math.floor((diff / 1000) / 60);
}


export const formatDate = (date: string | undefined, dateFormat: string | null = null) => {
    if (!date) {
        return null;
    }
    return format(new Date(date), dateFormat == null ? 'yyyy-MM-dd' : dateFormat);
}


export const dateFromString = (date: string) => {
    return new Date(Date.parse(date));
}

export const getDayOfWeek = (): number => {
    return new Date().getDay()
}

export const getTodayInMinutes = (): number => {

    const date = new Date();
    return date.getMinutes() + (MINUTES_PER_HOUR * date.getHours())
}

export const getStringInMinutes = (value: string) => {
    const splitedTime = value.split(':');

    if (splitedTime.length !== 2) {
        return -1;
    }

    return parseInt(splitedTime[0]) * 60 + parseInt(splitedTime[1])
}

export const getDateInMinutes = (value: Date) => {
    if (!value) {
        return -1;
    }

    return value.getHours() * 60 + value.getMinutes()
}

export const prepTime = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;

}


export const getDateFromMinutes = (value: number, calendarDate: string | Date): Date => {
    if (!value || !calendarDate) {
        return new Date();
    }
    const date = new Date(calendarDate)
    date.setHours(0)
    date.setMinutes(value)
    return date
}

export const checkDate = (date1: Date, date2: Date | null = null): boolean => {
    const checkDate1 = new Date(date1);
    const checkDate2 = date2 ? new Date(date2) : new Date();

    return checkDate1.toDateString() === checkDate2.toDateString()
}

export const checkDateBefore = (date1: Date, date2: Date | null = null): boolean => {
    const checkDate1 = new Date(date1);
    const checkDate2 = date2 ? new Date(date2) : new Date();

    return checkDate1.getTime() <= checkDate2.getTime()
}

export const formatDateValue = (value: string): string => {
    if (!value) {
        return value
    }
    if (value === 'dd. MM. yyyy') {
        return '';
    }

    return value.split('. ').reverse().join('-')
}

export const formatDateValueReverse = (value: string): string => {
    if (!value) {
        return value
    }
    if (value === 'yyyy-MM-dd') {
        return '';
    }

    return value.split('-').reverse().join('. ')
}


export const formatDateValueClear = (value: string): string | undefined => {
    if (!value) {
        return value
    }
    if (value === 'dd. MM. yyyy') {
        return undefined;
    }

    return value.split('. ').reverse().join('-')
}

export const formatDateValueNull = (value: string): string | null => {

    if (!value || value === 'yyyy-MM-dd' || value === 'dd. MM. yyyy') {
        return null
    }
    return value.split('. ').reverse().join('-')
}

export const checkYupDate = (validFrom: string | undefined, validTo: string | null | undefined): boolean => {
    if (!validTo) {
        return true;
    }
    return new Date(formatDateValue(validFrom as string)) > new Date(formatDateValue(validTo))
}

export const getDaysInMonth = (m: number, y: number) => {
    if (m === 2) {
        if (y % 4 === 0) {
            return 29
        }
        return 28
    }
    if (m === 4 || m === 6 || m === 9 || m === 11) {
        return 30
    }
    return 31

}


export const formatTime = (hour:number,minute:number):string =>{

    return `${hour <= 9 ? '0' + hour : hour}:${minute <= 9 ? '0' + minute : minute}`
}
