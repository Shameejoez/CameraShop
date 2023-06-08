import CardProduct from '../components/Card-product/Card-product';
import Banner from '../components/Banner/Banner';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumbs';
import CatalogSort from '../components/CatalogSort/Catalog-sort';
import CatalogFilter from '../components/CatalogFilter/Catalog-filter';
import Pagination from '../components/Pagination/Pagination';
import { useAppSelector } from '../hooks';
import { takeCameras } from '../store/data-process/data-selector';
import { useState } from 'react';


function Catalog(): JSX.Element | null {
  const products = useAppSelector(takeCameras);
  const [currentPage, setCurrentPage] = useState<number>(0);

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
    return null;
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
    </main>

  );
}


export default Catalog;
