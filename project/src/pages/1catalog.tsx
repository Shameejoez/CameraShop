import CardProduct from '../components/1card-product/1card-product';
import Banner from '../components/1banner/1banner';
import Breadcrumb from '../components/1breadcrumbs/Breadcrumbs';
import CatalogSort from '../components/1catalog-sort/1catalog-sort';
import CatalogFilter from '../components/1catalog-filter/1catalog-filter';
import Pagination from '../components/1p/agination/Pagination';
import { useAppSelector } from '../hooks';
import { takeCameras, takeGetCamerasStatus } from '../store/data-process/data-selectors';
import { useState } from 'react';
import { LoadingStatus } from '../consts';
import ErrorConnectMessage from '../components/1error-conntect-message/1error-connect-message';


function Catalog(): JSX.Element | null {
  const products = useAppSelector(takeCameras);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getCamerasStatus = useAppSelector(takeGetCamerasStatus);

  const currentPageHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber);

  };

  const catalogPageCount = Math.ceil(products.length / 9);

  const renderCatalogBook = () => {
    const copyProducts = [...products];

    const catalogBook = [];
    for (let i = 0; i < catalogPageCount; i++) {
      catalogBook.push(copyProducts.splice(0, 9));
    }

    return catalogBook;
  };


  if(renderCatalogBook().length === 0) {
    return <ErrorConnectMessage isVisible={getCamerasStatus === LoadingStatus.Rejected}/>;
  }

  return (
    <main>
      <Banner/>
      <div className="page-content">
        <Breadcrumb />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <CatalogFilter/>
              </div>
              <div className="catalog__content">
                <CatalogSort/>
                <div className="cards catalog__cards">
                  {
                    renderCatalogBook()[currentPage].map((product) =>
                      <CardProduct data={product} key={product.id}/>
                    )
                  }
                </div>
                <Pagination setActivePage={currentPageHandler} countPage={catalogPageCount} activePage={currentPage }/>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ErrorConnectMessage isVisible={getCamerasStatus === LoadingStatus.Rejected}/>
    </main>

  );
}


export default Catalog;
