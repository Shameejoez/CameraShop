import dayjs from 'dayjs';
import { DateFormat } from '../consts';
import updateLocal from 'dayjs/plugin/updateLocale';
import { CardProductInfo, Review } from '../types/types';

dayjs.extend(updateLocal);

dayjs.updateLocale('en', {
  months: [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
    'Августа', 'Сентябрь', 'Октябрь', 'Ноября', 'Декабря'
  ]
});
export const renderData = (date: string, dateFormat: DateFormat) => dayjs(date).format(dateFormat);

const reg = new RegExp(/\D/g);


// сортировка отзывов по дате (от новых к старым)
export const sortReview = (data: Review[]) => {
  const currentArray = data.map((el) => ({...el, sortParam: el.createAt.replace(reg, '')}));
  const sortedArray = currentArray.sort((a,b) => a.sortParam > b.sortParam ? -1 : 1);

  return sortedArray;
};

// расчет рейтинга (среднее значение из всех оценок)
export const setMainRating = (dataRatings: number []) => {
  const quantityElem = dataRatings.length;
  const initialRatting = dataRatings.reduce((acc, curr) => acc + curr) / quantityElem;

  return initialRatting;

};

// массив айди товаров
export const parseProductsId = (products : CardProductInfo[]) => products.map((el) => el.id);


export const sortingsMethods: {
  [key in string]: (a: CardProductInfo, b: CardProductInfo) => number
  } = {
    'priceDecrease': (a, b) => b.price - a.price,
    'priceIncrease': (a, b) => a.price - b.price,
    'ratingDecrease': (a, b) => (b.rating as number) - (a.rating as number),
    'ratingIncrease': (a, b) => (a.rating as number) - (b.rating as number),
    'unknown': () => 0
  };

export const searchIndex = (products: CardProductInfo[], id: CardProductInfo['id']) => products.map((el) => el.id).indexOf(id);

