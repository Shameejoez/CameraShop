import CardProduct from '../components/card-product/card-product';
import Banner from '../components/banner/banner';
import Breadcrumb from '../components/breadcrumbs/breadcrumbs';
import CatalogSort from '../components/catalog-sort/catalog-sort';
import CatalogFilter from '../components/catalog-filter/catalog-filter';
import Pagination from '../components/pagination/pagination';
import { useAppSelector } from '../hooks';
import { camerasSelector, takeGetCamerasStatus } from '../store/data-process/data-selectors';
import { LoadingStatus, PRODUCTS_ON_PAGE, defaultCard } from '../consts';
import ErrorConnectMessage from '../components/error-conntect-message/error-connect-message';
import useSearchParamsCustom from '../hooks/use-search-params-custom/use-search-params-custom';
import { filterRangePrice } from '../utils/filters';
import { takeRangePrice } from '../store/filter-process/filter-selectors';
import BasketAddItem from '../components/basket-popups/basket-add-item';
import BasketAddSucess from '../components/basket-popups/basket-add-sucess';
import { CardProductInfo } from '../types/types';
import { useState } from 'react';

type CatalogProps = {
  isActiveSuccessBasket: string;
  isActiveAddBasket: string;
  onClickSetBasketAdd: (isActive: string) => void;
  onClickBasketSucess: (isActive: string) => void;
}

function Catalog({isActiveSuccessBasket, onClickBasketSucess, onClickSetBasketAdd, isActiveAddBasket}: CatalogProps): JSX.Element {
  const rangePrice = useAppSelector(takeRangePrice);
  const cameras = filterRangePrice(useAppSelector(camerasSelector), rangePrice.min, rangePrice.max);
  const getCamerasStatus = useAppSelector(takeGetCamerasStatus);
  const [curentCamera, setCurrentCamera] = useState<CardProductInfo>(defaultCard);

  const {page, setPageParams} = useSearchParamsCustom({initialPage: 0});
  const currentPageHandler = (pageNumber: number) => {
    setPageParams(pageNumber);
  };

  const getCurrentCamera = (camera: CardProductInfo) => {
    setCurrentCamera(camera);
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
            <h1 className="title title--h2" onClick={() => onClickSetBasketAdd('is-active')}>Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <CatalogFilter onResetPage={currentPageHandler}/>
              </div>
              <div className="catalog__content">
                <CatalogSort/>
                <div className="cards catalog__cards">

                  { cameras.length === 0 ? 'Ничего не найдено' :
                    renderCatalogBook()[page].map((camera) =>
                      (
                        <CardProduct camera={camera} key={camera.id} onClickGetCurrentCamera={getCurrentCamera}
                          onClickSetAddBasket={onClickSetBasketAdd}
                        />
                      )
                    )}
                </div>
                {
                  catalogPageCount >= 2 &&
                      <Pagination setActivePage={currentPageHandler} countPage={catalogPageCount} activePage={page}/>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
      {
        getCamerasStatus === LoadingStatus.Rejected &&
     <ErrorConnectMessage isVisible={getCamerasStatus === LoadingStatus.Rejected ? 'is-active' : ''}/>
      }
      <BasketAddItem camera={curentCamera} isActive={isActiveAddBasket} onClickSetBasketAdd={onClickSetBasketAdd} onClickBasketSucess={onClickBasketSucess}/>
      <BasketAddSucess isActive={isActiveSuccessBasket} onClickSetBasketSucess={onClickBasketSucess}/>
    </main>
  );
}


export default Catalog;
