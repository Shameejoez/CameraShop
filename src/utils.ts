import dayjs from 'dayjs';
import { DateFormat } from './consts';

import updateLocal from 'dayjs/plugin/updateLocale';
dayjs.extend(updateLocal);

dayjs.updateLocale('en', {
  months: [
    'Января', 'Февралья', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
    'Августа', 'Сентябрь', 'Октябрь', 'Ноября', 'Декабря'
  ]
});
export const renderData = (date: string, dateFormat: DateFormat) => dayjs(date).format(dateFormat);

