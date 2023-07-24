import CardProduct from '../components/card-product/card-product';
import Banner from '../components/banner/banner';
import Breadcrumb from '../components/breadcrumbs/breadcrumbs';
import CatalogSort from '../components/catalog-sort/catalog-sort';
import CatalogFilter from '../components/catalog-filter/catalog-filter';
import Pagination from '../components/pagination/pagination';
import { useAppSelector } from '../hooks';
import { camerasSelector, takeGetCamerasStatus } from '../store/data-process/data-selectors';
import { LoadingStatus, PRODUCTS_ON_PAGE } from '../consts';
import ErrorConnectMessage from '../components/error-conntect-message/error-connect-message';
import useSearchParamsCustom from '../hooks/use-search-params-custom/use-search-params-custom';

function Catalog(): JSX.Element {
  const cameras = useAppSelector(camerasSelector);
  const getCamerasStatus = useAppSelector(takeGetCamerasStatus);
  const {page, setPageParams} = useSearchParamsCustom({initialPage: 1});
  const currentPageHandler = (pageNumber: number) => {
    setPageParams(pageNumber);
  };

  const catalogPageCount = Math.ceil(cameras.length / PRODUCTS_ON_PAGE);

  const renderCatalogBook = () => {

    const copyProducts = [...cameras];
    const catalogBook = [];
    for (let i = 0; i < catalogPageCount; i++) {
      catalogBook.push(copyProducts.splice(0, PRODUCTS_ON_PAGE));
    }
    return catalogBook;
  };

  return (
    <main>
      <Banner/>
      <div className="page-content">
        <Breadcrumb />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2" >Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <CatalogFilter onResetPage={currentPageHandler}/>
              </div>
              <div className="catalog__content">
                <CatalogSort/>
                <div className="cards catalog__cards">

                  { cameras.length === 0 ? 'Ничего не найдено' :
                    renderCatalogBook()[(page as number)].map((camera) =>
                      <CardProduct camera={camera} key={camera.id}/>
                    )}
                </div>
                {
                  catalogPageCount >= 2 &&
                      <Pagination setActivePage={currentPageHandler} countPage={catalogPageCount} activePage={page as number}/>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
      <ErrorConnectMessage isVisible={getCamerasStatus === LoadingStatus.Rejected ? 'is-active' : ''}/>
    </main>
  );
}

export default Catalog;
