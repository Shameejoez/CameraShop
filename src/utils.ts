import dayjs from 'dayjs';
import { DateFormat } from './consts';
import updateLocal from 'dayjs/plugin/updateLocale';
import { Review } from './types/types';

dayjs.extend(updateLocal);

dayjs.updateLocale('en', {
  months: [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
    'Августа', 'Сентябрь', 'Октябрь', 'Ноября', 'Декабря'
  ]
});
export const renderData = (date: string, dateFormat: DateFormat) => dayjs(date).format(dateFormat);

const reg = new RegExp(/\D/g);

export const sortReview = (data: Review[]) => {
  const currentArray = data.map((el) => ({...el, sortParam: el.createAt.replace(reg, '')}));
  const sortedArray = currentArray.sort((a,b) => a.sortParam > b.sortParam ? -1 : 1);

  return sortedArray;
};
