import { useSearchParams } from 'react-router-dom';
import {useState, ChangeEvent, useEffect} from 'react';
import { TypeProduct } from '../../consts';
import { RangePrice } from '../../types/types';

type useSearchParamsCustomProps = {
    initialPage?: number;
    initialFilter?: string[] | null;
    initialSortType?: string | null;
    initialSortOrder?: string | null;
    initialPrice?: {
      min: number | null;
      max: number | null;
    };
}

const useSearchParamsCustom = ({initialPage, initialFilter, initialSortType, initialSortOrder, initialPrice}: useSearchParamsCustomProps) => {
  const [search, setSearch] = useSearchParams();
  const [page, setPage] = useState<number>(initialPage ?? 0);
  const [filters, setFilters] = useState<string[] | null>(initialFilter ?? null);
  const [sortType, setSortType] = useState<string | null>(initialSortType ?? null);
  const [sortOrder, setSortOrder] = useState<string | null>(initialSortOrder ?? null);
  const [prices, setPrices] = useState<RangePrice>({
    min: initialPrice?.min ?? 0,
    max: initialPrice?.max ?? 199000,
  });

  useEffect(() => {
    setAllParams();

  },[]);

  /// Фильтры
  const setFilterParams = (e: ChangeEvent<HTMLInputElement>) => {
    const currenFilter = e.target.id;
    let filterParams = search.get('filters')?.split(',') ?? [];

    if (e.target.checked && e.target.id === 'Видеокамера') {
      filterParams = filterParams.filter((filter) => (filter !== TypeProduct.Instant && filter !== TypeProduct.Digital));
    }

    if(e.target.checked) {
      filterParams.push(currenFilter);
    } else {
      filterParams = filterParams.filter((filter) => filter !== currenFilter);
    }

    if (filterParams.length === 0) {
      search.delete('filters');
    } else {
      search.set('filters', filterParams.join(','));
    }

    setSearch(search);
    setFilters([...(String(search.get('filters'))).split(',')]);
  };

  const deleteFilterParams = () => {
    setFilters([]);
    search.delete('filters');
    setPage(0);
    setSearch(search);
  };

  // Цена
  const setPriceUpParams = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'priceMax' && e.target.value.length > 0) {
      search.set(e.target.id, e.target.value);
      setPrices((prev) => ({...prev, max: Number(e.target.value)}));
    } else {
      search.delete(e.target.id);
      setPrices((prev) => ({...prev, max: null}));
    }

    setSearch(search);

  };

  const setPriceDownParams = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'priceMin' && e.target.value.length > 0) {
      search.set(e.target.id, e.target.value);
      setPrices((prev) => ({...prev, min: Number(e.target.value)}));
    } else {
      search.delete(e.target.id);
      setPrices((prev) => ({...prev, min: null}));
    }
    setSearch(search);
  };

  // Название сортировки
  const setSortTypeParams = (e: ChangeEvent<HTMLInputElement>) => {
    const currenSort = e.target.id;
    search.set('sort', currenSort);

    setSearch(search);
    setSortType(e.target.id);
  };
  // порядок сортировки
  const setSortOrderParams = (e: ChangeEvent<HTMLInputElement>) => {
    const currentOrder = e.target.id;
    search.set('sortOrder', currentOrder);

    setSearch(search);
    setSortOrder(e.target.id);
  };
  // Для настройки фильтров и сортировок по параметрам;
  const setAllParams = () => {
    if (Number(search.get('page')) === 0) {
      setPage(Number(search.get('page')));
    } else {
      setPage(Number(search.get('page')) - 1);
    }

    setPrices((prev) => ({...prev, max: Number(search.get('priceMax'))}));
    setPrices((prev) => ({...prev, min: Number(search.get('priceMin'))}));
    setFilters([...(String(search.get('filters'))).split(',')]);
    setSortType(search.get('sort'));
    setSortOrder(search.get('sortOrder'));
  };

  // Номер страницы пагинации
  const setPageParams = (pageNum: number) => {
    search.set('page', String(pageNum + 1));
    setPage(pageNum);
    setSearch(search);

  };

  return {
    sortType,
    setSortTypeParams,
    sortOrder,
    setSortOrderParams,
    filters,
    setFilterParams,
    deleteFilterParams,
    page,
    setPageParams,
    setPriceUpParams,
    setPriceDownParams,
    prices
  };
};


export default useSearchParamsCustom;
