import { ChangeEvent, useEffect, useState } from 'react';
import { CategoryProduct, FilterCategoryName, Mastery, PriceRange, SetFilterMode, TypeProduct } from '../../consts';
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
  const camerasPricesMin = Math.min(...camerasPrices);
  const camerasPricesMax = Math.max(...camerasPrices);
  const [min, setMin] = useState<string>('');
  const [max, setMax] = useState<string>('');

  useEffect(() => {
    dispatch(setRangePrice({
      min : prices.min,
      max:  prices.max === 0 ? PriceRange.Max : prices.max
    }));

    setMin(prices.min ? String(prices.min) : '');
    setMax(prices.max ? String(prices.max) : '');

    if ((filters as string[])?.length >= 1) {
      filters?.forEach((el) => onChangePushFilters(el));
    }

  }, [filters, prices]);

  const onChangePushFilters = (filterName: string) => {
    switch(filterName) {
      case CategoryProduct.Camera:
        [TypeProduct.Instant, TypeProduct.Digital].forEach((filter) => onChangeUnshiftFilters(filter));
        return dispatch(setCategory(CategoryProduct.Camera));
      case CategoryProduct.Camcorder :
        return dispatch(setCategory(CategoryProduct.Camcorder));
      case TypeProduct.Collectible :
        return dispatch(setType({action: SetFilterMode.Push, filterType: filterName}));
      case TypeProduct.Instant :
        return dispatch(setType({action: SetFilterMode.Push, filterType: filterName}));
      case TypeProduct.Digital :
        return dispatch(setType({action: SetFilterMode.Push, filterType: filterName}));
      case TypeProduct.Film :
        return dispatch(setType({action: SetFilterMode.Push, filterType: filterName}));
      case Mastery.Null :
        return dispatch(setLevel({action: SetFilterMode.Push, filterType: filterName}));
      case Mastery.Amateur :
        return dispatch(setLevel({action: SetFilterMode.Push, filterType: filterName}));
      case Mastery.Professional :
        return dispatch(setLevel({action: SetFilterMode.Push, filterType: filterName}));
    }
  };


  const onChangeSetPriceMin = (e: ChangeEvent<HTMLInputElement>) =>{

    const currentValue = e.target.value.trim().replace(/\D/g , '');

    if (currentValue === '') {
      setMin(currentValue);
      setPriceDownParams(currentValue);
      return;
    }

    if (Number(currentValue) > camerasPricesMax) {
      setMin(String(camerasPricesMax));
      setPriceDownParams(String(camerasPricesMax));
      return;
    }


    if(Number(max) > 0 && Number(currentValue) > Number(max)) {
      setMin(max);
      setPriceDownParams(max);
      return;
    }

    onResetPage(0);
    setPageParams(0);
    setMin(currentValue);
    setPriceDownParams(currentValue);

  };

  const onBlurSetPriceMin = (e: ChangeEvent<HTMLInputElement>) => {
    onResetPage(0);
    setPageParams(0);
    if (e.target.value === '') {
      return;
    }

    if(Number(e.target.value) < camerasPricesMin) {
      setMin(String(camerasPricesMin));
      setPriceDownParams(String(camerasPricesMin));
    }
    if(Number(e.target.value) > camerasPricesMax) {
      String(String(camerasPricesMax));
      setPriceDownParams(String(camerasPricesMax));
    }
  };

  const onChangeSetPriceMax = (e: ChangeEvent<HTMLInputElement>) =>{
    const currentValue = e.target.value.trim().replace(/\D/g , '');
    if (currentValue === '') {
      setMax(String(currentValue));
      setPriceUpParams(currentValue);
      return;
    }

    onResetPage(0);
    setPageParams(0);

    if (Number(e.target.value) > camerasPricesMax) {
      setMax(String(camerasPricesMax));
      setPriceUpParams(String(camerasPricesMax));
    }
    else {
      setMax(String(e.target.value));
      setPriceUpParams(e.target.value);
    }
  };

  const onBlurSetPriceMax = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      return;
    }

    onResetPage(0);
    setPageParams(0);

    if (Number(e.target.value) < camerasPricesMin) {
      setMax(String(prices.min === 0 ? PriceRange.Min : prices.min));
      setPriceUpParams(String(prices.min === 0 ? PriceRange.Min : prices.min));
    }
  };

  const onClickRemoveFilters = () => {
    onResetPage(0);
    setPageParams(0);
    filters?.forEach((el) => onChangeUnshiftFilters(el));
    deleteFilterParams();
    setPriceUpParams('');
    setPriceDownParams('');
  };

  const onChangeUnshiftFilters = (filterName: string) => {
    switch(filterName) {
      case CategoryProduct.Camera :
        return dispatch(setCategory(null));
      case CategoryProduct.Camcorder :
        return dispatch(setCategory(null));
      case TypeProduct.Collectible :
        return dispatch(setType({action: SetFilterMode.Unshift, filterType: TypeProduct.Collectible}));
      case TypeProduct.Instant :
        return dispatch(setType({action: SetFilterMode.Unshift, filterType: TypeProduct.Instant}));
      case TypeProduct.Digital :
        return dispatch(setType({action: SetFilterMode.Unshift, filterType: TypeProduct.Digital}));
      case TypeProduct.Film :
        return dispatch(setType({action: SetFilterMode.Unshift, filterType: TypeProduct.Film}));
      case Mastery.Null :
        return dispatch(setLevel({action: SetFilterMode.Unshift, filterType: Mastery.Null}));
      case Mastery.Amateur :
        return dispatch(setLevel({action: SetFilterMode.Unshift, filterType: Mastery.Amateur}));
      case Mastery.Professional :
        return dispatch(setLevel({action: SetFilterMode.Unshift, filterType: Mastery.Professional}));
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
      case CategoryProduct.Camera:
        return !!filters?.includes(CategoryProduct.Camcorder);
      case CategoryProduct.Camcorder :
        return !!filters?.includes(CategoryProduct.Camera);
      case TypeProduct.Instant :
        return !!filters?.includes(CategoryProduct.Camera);
      case TypeProduct.Digital :
        return !!filters?.includes(CategoryProduct.Camera);
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
                <input type="text" name="priceDowm" id='priceMin' placeholder={String(camerasPricesMin)} value={min} onChange={onChangeSetPriceMin}
                  onBlur={onBlurSetPriceMin} data-testid={'priceDown-test'}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="text" name="priceUp" id='priceMax' placeholder={String(camerasPricesMax)} value={max} onChange={onChangeSetPriceMax}
                  onBlur={onBlurSetPriceMax} data-testid={'priceUp-test'}
                />
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
