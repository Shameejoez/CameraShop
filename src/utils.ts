import dayjs from 'dayjs';
import { DateFormat } from './consts';
import updateLocal from 'dayjs/plugin/updateLocale';
import { CardProductInfo, Review } from './types/types';

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


export const setMainRating = (dataRatings: number []) => {
  const quantityElem = dataRatings.length;
  const initialRatting = dataRatings.reduce((acc, curr) => acc + curr) / quantityElem;

  return initialRatting;

};

// массив айди товаров
export const parseProductsId = (products : CardProductInfo[]) => products.map((el) => el.id);

