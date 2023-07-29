import { CategoryProduct, Mastery, TypeProduct } from '../consts';
import { CardProductInfo } from '../types/types';

// фильтр категорий
export const filterCategory = (cameras: CardProductInfo[], filterName: CategoryProduct | null) => {
  if (filterName === 'Видеокамера') {
    return cameras.filter((camera) => camera.category === 'Видеокамера');
  }

  if (filterName === 'Фотокамера') {
    return cameras.filter((camera) => camera.category === 'Фотоаппарат');
  }
  return cameras;
};

// фильтр типов;
export const filterTypes = (
  cameras: CardProductInfo[], filtersName: TypeProduct[]
) => {
  const filteredCameras: CardProductInfo[][] = [];
  filtersName?.forEach((el) => {
    const currentFilter = el;
    filteredCameras.push(cameras.filter((camera) => camera.type === currentFilter));
  });

  if ( filteredCameras.length === 0) {
    return cameras;
  }

  const finalCameras = filteredCameras.reduce((prev, curr) => prev.concat(curr));

  return finalCameras;
};

// фильтр по уровню мастерства
export const filterLevel = (cameras: CardProductInfo[], filtersName: Mastery[]) => {
  const filteredCameras: CardProductInfo[][] = [];
  filtersName?.forEach((el) => {
    const currentFilter = el;
    filteredCameras.push(cameras.filter((camera) => camera.level === currentFilter));
  });

  if ( filteredCameras.length === 0) {
    return cameras;
  }

  const finalCameras = filteredCameras.reduce((prev, curr) => prev.concat(curr));

  return finalCameras;
};

// по ценовому диапазону
export const filterRangePrice = (cameras: CardProductInfo[], min: number | null, max: number | null) =>
  cameras.filter((camera) => camera.price >= (min === null ? 1990 : min) && camera.price <= (max === null ? 199000 : max));


