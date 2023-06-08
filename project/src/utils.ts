import dayjs from 'dayjs';
import { DateFormat } from './consts';

import updateLocal from 'dayjs/plugin/updateLocale';
dayjs.extend(updateLocal);

dayjs.updateLocale('en', {
  months: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'December'
  ]
});
export const renderData = (date: string, dateFormat: DateFormat) => dayjs(date).format(dateFormat);

