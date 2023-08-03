import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { setMode, setSort } from '../../store/filter-process/filter-slice';
import { SortMode, SortName, SortTypeId } from '../../consts';
import useSearchParamsCustom from '../../hooks/use-search-params-custom/use-search-params-custom';

function CatalogSort (): JSX.Element {
  const dispatch = useAppDispatch();
  const { setSortTypeParams, sortType, setSortOrderParams, sortOrder } = useSearchParamsCustom({initialSortType: null, initialSortOrder: null});

  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    sortType === SortTypeId.SortPrice ? dispatch(setSort(SortName.Price)) :
      sortType === SortTypeId.SortPopular ? dispatch(setSort(SortName.Rating)) :
        dispatch(setSort(SortName.Unknown));

    // eslint-disable-next-line no-nested-ternary
    sortOrder === SortTypeId.SortDecrease ? dispatch(setMode(SortMode.Decrease)) :
      sortOrder === SortTypeId.SortIncrease ? dispatch(setMode(SortMode.Increase)) :
        dispatch(setMode(SortMode.Unknown));
  }, [sortOrder, sortType, dispatch]);

  const onChangeSetSearchParams = (e: ChangeEvent<HTMLInputElement>) =>
    (e.target.id === SortTypeId.SortIncrease || e.target.id === SortTypeId.SortDecrease) ? setSortOrderParams(e.target.id as SortTypeId) : setSortTypeParams(e.target.id as SortTypeId);

  const onSortButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeSetSearchParams(e);
    switch (e.target.id) {
      case SortTypeId.SortPrice:
        if(!sortOrder) {
          dispatch(setMode(SortMode.Increase));
          setSortOrderParams('up' as SortTypeId);
          dispatch(setSort(SortName.Price));
        } else {
          dispatch(setSort(SortName.Price));
        }
        break;
      case SortTypeId.SortPopular:
        if(!sortOrder) {
          dispatch(setMode(SortMode.Increase));
          setSortOrderParams('up' as SortTypeId);
          dispatch(setSort(SortName.Rating));
        } else {
          dispatch(setSort(SortName.Rating));
        }
        break;
      case SortTypeId.SortIncrease:
        if (!sortType) {
          dispatch(setSort(SortName.Price));
          setSortTypeParams('sortPrice' as SortTypeId);
          dispatch(setMode(SortMode.Increase));
        } else {
          dispatch(setMode(SortMode.Increase));
        }
        break;
      case SortTypeId.SortDecrease:
        if (!sortType) {
          dispatch(setSort(SortName.Price));
          setSortTypeParams('sortPrice' as SortTypeId);
          dispatch(setMode(SortMode.Decrease));
        } else {
          dispatch(setMode(SortMode.Decrease));
        }
        break;
    }
  };

  return (
    <div className="catalog-sort" data-testid={'sort-catalog-test'}>
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" value={'цена'} checked={sortType === SortTypeId.SortPrice} onChange={(e)=> onSortButtonChange(e)}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={sortType === SortTypeId.SortPopular} onChange={(e)=> onSortButtonChange(e)}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={sortOrder === SortTypeId.SortIncrease}
                onChange={(e)=> onSortButtonChange(e)} data-testid={'up-test'}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={sortOrder === SortTypeId.SortDecrease}
                onChange={(e)=> onSortButtonChange(e)} data-testid={'down-test'}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>);
}

export default CatalogSort;
