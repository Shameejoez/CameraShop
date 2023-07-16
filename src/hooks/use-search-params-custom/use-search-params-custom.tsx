import { useSearchParams } from 'react-router-dom';
import {useState, ChangeEvent, useEffect} from 'react';

type useSearchParamsCustomProps = {
    initialPage?: number;
    initialFilter?: string[] | null;
    initialSortType?: string | null;
    initialSortOrder?: string | null;
}

const useSearchParamsCustom = ({initialPage, initialFilter, initialSortType, initialSortOrder}: useSearchParamsCustomProps) => {
  const [search, setSearch] = useSearchParams();
  const [page, setPage] = useState<number | null>(initialPage ?? null);
  const [filters, setFilters] = useState<string[] | null>(initialFilter ?? null);
  const [sortType, setSortType] = useState<string | null>(initialSortType ?? null);
  const [sortOrder, setSortOrder] = useState<string | null>(initialSortOrder ?? null);

  useEffect(() => {
    setAllParams();
  },[]);

  /// Фильтры
  const setFilterParams = (e: ChangeEvent<HTMLInputElement>) => {
    const currenFilter = e.target.id;
    let filterParams = search.get('filters')?.split(',') ?? [];

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
  // Название сортировки
  const setSortTypeParams = (e: ChangeEvent<HTMLInputElement>) => {
    const currenSort = e.target.id;
    search.set('sort', currenSort);

    setSearch(search);
    setSortType(e.target.id);
  };

  const setSortOrderParams = (e: ChangeEvent<HTMLInputElement>) => {
    const currentOrder = e.target.id;
    search.set('sortOrder', currentOrder);

    setSearch(search);
    setSortOrder(e.target.id);
  };
  // Для настройки фильтров и сортировок по параметрам;
  const setAllParams = () => {
    setPage(Number(search.get('page')));
    setFilters([...(String(search.get('filters'))).split(',')]);
    setSortType(search.get('sort'));
    setSortOrder(search.get('sortOrder'));
  };

  // Номер страницы пагинации
  const setPageParams = (pageNum: number) => {
    if (pageNum) {
      search.set('page', String(pageNum));
    } else {
      search.delete('page');
    }
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
    page,
    setPageParams,
  };
};


export default useSearchParamsCustom;
