/* eslint-disable no-nested-ternary */
import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { setMode, setSort } from '../../store/site-process/filter-slice';
import { SortMode, SortName } from '../../consts';
import useSearchParamsCustom from '../../hooks/use-search-params-custom/use-search-params-custom';

function CatalogSort (): JSX.Element {
  const dispatch = useAppDispatch();
  const { setSortTypeParams, sortType } = useSearchParamsCustom({initialSortType: null});
  const { setSortOrderParams, sortOrder } = useSearchParamsCustom({initialSortOrder: null});

  useEffect(() => {
    sortType === 'sortPrice' ? dispatch(setSort(SortName.Price)) :
      sortType === 'sortPopular' ? dispatch(setSort(SortName.Rating)) :
        dispatch(setSort(SortName.Unknown));

    sortOrder === 'down' ? dispatch(setMode(SortMode.Decrease)) : dispatch(setMode(SortMode.Increase));
  }, [sortOrder, sortType, dispatch]);

  const onChangeSetSearchParams = (e: ChangeEvent<HTMLInputElement>) =>
    (e.target.id === 'up' || e.target.id === 'down') ? setSortOrderParams(e) : setSortTypeParams(e);

  const onSortButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeSetSearchParams(e);
    switch (e.target.id) {
      case 'sortPrice':
        return dispatch(setSort(SortName.Price));
      case 'sortPopular':
        return dispatch(setSort(SortName.Rating));
      case 'up':
        return dispatch(setMode(SortMode.Increase));
      case 'down':
        return dispatch(setMode(SortMode.Decrease));
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" value={'цена'} onChange={(e)=> onSortButtonChange(e)}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" onChange={(e)=> onSortButtonChange(e)}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" defaultChecked aria-label="По возрастанию" onChange={(e)=> onSortButtonChange(e)} data-testid={'up-test'}/>
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" onChange={(e)=> onSortButtonChange(e)} data-testid={'down-test'}/>
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
