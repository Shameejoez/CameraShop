import CardProduct from '../components/card-product/card-product';
import Banner from '../components/banner/banner';
import Breadcrumb from '../components/breadcrumbs/breadcrumbs';
import CatalogSort from '../components/catalog-sort/catalog-sort';
import CatalogFilter from '../components/catalog-filter/catalog-filter';
import Pagination from '../components/pagination/pagination';
import { useAppDispatch, useAppSelector } from '../hooks';
import { camerasSelector, takeGetCamerasStatus, takeRatings } from '../store/data-process/data-selectors';
import { useEffect, useState } from 'react';
import { LoadingStatus, PRODUCTS_ON_PAGE } from '../consts';
import ErrorConnectMessage from '../components/error-conntect-message/error-connect-message';
import { setSetSet } from '../store/data-process/data-slice';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(camerasSelector);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getCamerasStatus = useAppSelector(takeGetCamerasStatus);
  const getRatings = useAppSelector(takeRatings);
  const newArr = cameras.map((camera) => ({...camera, rating: Math.ceil(getRatings.filter((el) => el.id === camera.id)[0]?.currentRating)}));

  useEffect(() => {
    if(getRatings.length === 40) {
      dispatch(setSetSet(newArr));

    }
  }, [getRatings.length]);


  const currentPageHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber);

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


  if(renderCatalogBook().length === 0) {
    return <ErrorConnectMessage isVisible={getCamerasStatus === LoadingStatus.Rejected ? 'is-active' : ''}/>;
  }

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
                <CatalogFilter resetPage={currentPageHandler}/>
              </div>
              <div className="catalog__content">
                <CatalogSort/>
                <div className="cards catalog__cards">
                  {
                    renderCatalogBook()[currentPage].map((camera) =>
                      <CardProduct camera={camera} key={camera.id}/>
                    )
                  }
                </div>
                <Pagination setActivePage={currentPageHandler} countPage={catalogPageCount} activePage={currentPage}/>
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
