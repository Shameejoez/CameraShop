import { CardProductInfo } from '../types/types';

// фильтр категорий
export const filterCategory = (cameras: CardProductInfo[], filterName?: ('Видеокамера' | 'Фотокамера')) => {

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
  cameras: CardProductInfo[], filtersName?: ('Цифровая' | 'Плёночная' | 'Моментальная' | 'Коллекционная')[]
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
export const filterLevel = (cameras: CardProductInfo[], filtersName?: ('Нулевой' | 'Любительский' | 'Профессиональный')[]) => {
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
