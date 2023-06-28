import { CategoryProduct, FilterCategoryName, Mastery, TypeProduct } from '../../consts';

function CatalogFilter (): JSX.Element {

  const renderFilterCategory = (filterName: FilterCategoryName, categories: string[]): JSX.Element => (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">{filterName}</legend>
      {
        categories.map((category) => (
          <div key={category} className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" key={`${category}-input`} name={category}/><span className="custom-checkbox__icon" /><span className="custom-checkbox__label">{category}</span>
            </label>
          </div>
        ))
      }


    </fieldset>
  );

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" />
              </label>
            </div>
          </div>
        </fieldset>
        {renderFilterCategory(FilterCategoryName.Category, Object.values(CategoryProduct))}
        {renderFilterCategory(FilterCategoryName.Type, Object.values(TypeProduct))}
        {renderFilterCategory(FilterCategoryName.Mastery, Object.values(Mastery))}
        <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}


export default CatalogFilter;
