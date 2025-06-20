import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


const convertDate = (date: Date): string => {
    return dayjs.utc(date).format('MMMM D, YYYY HH:mm');
}

export default convertDate;