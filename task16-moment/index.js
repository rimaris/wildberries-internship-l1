import moment from 'moment';

export function nextDay(dateStr)  {
    return moment(dateStr).add(1, 'days').format("YYYY-MM-DD");
}
