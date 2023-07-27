/* eslint-disable no-nested-ternary */
import { ChangeEvent, useEffect } from 'react';
import { CategoryProduct, FilterCategoryName, Mastery, TypeProduct } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCategory, setLevel, setRangePrice, setType } from '../../store/site-process/filter-slice';
import useSearchParamsCustom from '../../hooks/use-search-params-custom/use-search-params-custom';
import { camerasSelector } from '../../store/data-process/data-selectors';

type CatalogFilterProps = {
  onResetPage: (page: number) => void;
}

function CatalogFilter ({onResetPage}: CatalogFilterProps): JSX.Element {
  const {setFilterParams, filters, deleteFilterParams, setPriceUpParams, setPriceDownParams, prices, setPageParams} = useSearchParamsCustom({initialFilter: [], initialPrice: { min: null, max: null}});
  const dispatch = useAppDispatch();
  const camerasPrices = useAppSelector(camerasSelector).map((camera) => camera.price);
  const camerasPricesMin = Math.min.apply(null, camerasPrices);
  const camerasPricesMax = Math.max.apply(null, camerasPrices);

  useEffect(() => {

    dispatch(setRangePrice({
      min : prices.min,
      max:  prices.max === 0 ? 199000 : prices.max
    }));

    if ((filters as string[])?.length >= 1) {
      filters?.forEach((el) => onChangePushFilters(el));
    }

  }, [filters, prices]);

  const onChangePushFilters = (filterName: string) => {
    switch(filterName) {
      case 'Видеокамера':
        ['Плёночная', 'Моментальная'].forEach((filter) => onChangeUnshiftFilters(filter));
        return dispatch(setCategory(CategoryProduct.Camera));
      case 'Фотокамера' :
        return dispatch(setCategory(CategoryProduct.Camcorder));
      case 'Цифровая' :
        return dispatch(setType({action: 'push', filterType: filterName}));
      case 'Плёночная' :
        return dispatch(setType({action: 'push', filterType: filterName}));
      case 'Моментальная' :
        return dispatch(setType({action: 'push', filterType: filterName}));
      case 'Коллекционная' :
        return dispatch(setType({action: 'push', filterType: filterName}));
      case 'Нулевой' :
        return dispatch(setLevel({action: 'push', filterType: filterName}));
      case 'Любительский' :
        return dispatch(setLevel({action: 'push', filterType: filterName}));
      case 'Профессиональный' :
        return dispatch(setLevel({action: 'push', filterType: filterName}));
    }
  };

  const onChangeSetPriceParams = (e: ChangeEvent<HTMLInputElement>) => {
    onResetPage(0);
    setPageParams(0);
    e.target.id === 'priceMax' ? setPriceUpParams(e) : setPriceDownParams(e);
  };


  const onClickRemoveFilters = () => {
    onResetPage(0);
    setPageParams(0);
    filters?.forEach((el) =>onChangeUnshiftFilters(el));
    deleteFilterParams();

  };

  const onChangeUnshiftFilters = (filterName: string) => {
    switch(filterName) {
      case 'Видеокамера':
        return dispatch(setCategory(null));
      case 'Фотокамера' :
        return dispatch(setCategory(null));
      case 'Цифровая' :
        return dispatch(setType({action: 'unshift', filterType: TypeProduct.Collectible}));
      case 'Плёночная' :
        return dispatch(setType({action: 'unshift', filterType: TypeProduct.Instant}));
      case 'Моментальная' :
        return dispatch(setType({action: 'unshift', filterType: TypeProduct.Digital}));
      case 'Коллекционная' :
        return dispatch(setType({action: 'unshift', filterType: TypeProduct.Film}));
      case 'Нулевой' :
        return dispatch(setLevel({action: 'unshift', filterType: Mastery.Null}));
      case 'Любительский' :
        return dispatch(setLevel({action: 'unshift', filterType: Mastery.Amateur}));
      case 'Профессиональный' :
        return dispatch(setLevel({action: 'unshift', filterType: Mastery.Professional}));
    }
  };

  const onChangeSetFilters = (e: ChangeEvent<HTMLInputElement>) => {

    onResetPage(0);
    setFilterParams(e);
    setPageParams(0);
    if(e.target.checked) {
      onChangePushFilters(e.target.name);
    } else {
      onChangeUnshiftFilters(e.target.name);
    }
  };

  const setDisabled = (filterName: string) => {
    switch(filterName) {
      case 'Видеокамера':
        return !!filters?.includes('Фотокамера');
      case 'Фотокамера' :
        return !!filters?.includes('Видеокамера');
      case 'Плёночная' :
        return !!filters?.includes('Видеокамера');
      case 'Моментальная' :
        return !!filters?.includes('Видеокамера');
    }
  };

  const renderFilterCategory = (filterName: FilterCategoryName, categories: string[]): JSX.Element => (
    <fieldset className="catalog-filter__block" >
      <legend className="title title--h5">{filterName}</legend>
      {
        categories.map((category) => (
          <div key={category} className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" key={`${category}-input`} id={category} name={category} onChange={onChangeSetFilters}
                checked={filters?.includes(category)} disabled={setDisabled(category)}
              /><span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{category}</span>
            </label>
          </div>
        ))
      }
    </fieldset>
  );

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden" >Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="priceDowm" id='priceMin' placeholder={String(camerasPricesMin)} onChange={onChangeSetPriceParams} data-testid={'priceDown-test'}/>
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" id='priceMax' placeholder={String(camerasPricesMax)} onChange={onChangeSetPriceParams} data-testid={'priceUp-test'}/>
              </label>
            </div>
          </div>
        </fieldset>
        {renderFilterCategory(FilterCategoryName.Category, Object.values(CategoryProduct))}
        {renderFilterCategory(FilterCategoryName.Type, Object.values(TypeProduct))}
        {renderFilterCategory(FilterCategoryName.Mastery, Object.values(Mastery))}
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={onClickRemoveFilters}>Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilter;
