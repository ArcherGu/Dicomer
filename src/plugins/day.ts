import dayjs from "dayjs";

function dateFormat(date: string | Date, pattern: string = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(pattern);
}

export {
    dayjs,
    dateFormat
};