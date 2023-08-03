import { useSearchParams } from 'react-router-dom';
import {useState, ChangeEvent, useEffect} from 'react';
import { CategoryProduct, PriceRange, SortTypeId, TypeProduct } from '../../consts';
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
    max: initialPrice?.max ?? PriceRange.Max,
  });

  useEffect(() => {
    setAllParams();

  },[]);

  /// Фильтры
  const setFilterParams = (e: ChangeEvent<HTMLInputElement>) => {
    const { id: currenFilter, checked } = e.target;


    let filterParams = search.get('filters')?.split(',') ?? [];

    if (checked && currenFilter === CategoryProduct.Camera) {
      filterParams = filterParams.filter((filter) => (filter !== TypeProduct.Instant && filter !== TypeProduct.Digital));
    }

    if(checked) {
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
  const setPriceUpParams = (value: string) => {
    if ( value.length > 0) {
      search.set('priceMax', value);
      setPrices((prev) => ({...prev, max: Number(value)}));
    } else {
      search.delete('priceMax');
      setPrices((prev) => ({...prev, max: null}));
    }

    setSearch(search);

  };

  const setPriceDownParams = (value: string) => {
    if (value.length > 0) {
      search.set('priceMin', value);
      setPrices((prev) => ({...prev, min: Number(value)}));
    } else {
      search.delete('priceMin');
      setPrices((prev) => ({...prev, min: null}));
    }
    setSearch(search);
  };

  // Название сортировки
  const setSortTypeParams = (type: SortTypeId) => {

    search.set('sort', type);

    setSearch(search);
    setSortType(type);
  };
  // порядок сортировки
  const setSortOrderParams = (mode: SortTypeId) => {
    search.set('sortOrder', mode);

    setSearch(search);
    setSortOrder(mode);
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
