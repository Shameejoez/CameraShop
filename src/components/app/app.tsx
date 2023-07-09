import { Route, Routes, } from 'react-router-dom';
import Catalog from '../../pages/catalog';
import Header from '../header/header';
import { AppRoutes } from '../../consts';
import Product from '../../pages/product';
import NotFound from '../not-found/not-found';
import HistoryRouter from '../history-router.tsx/history-router';
import browserHistory from '../../browser-history';
import { useEffect } from 'react';
import { parseProductsId } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { takeCameras } from '../../store/data-process/data-selectors';
import { getReviews } from '../../store/action';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(takeCameras);

  useEffect(() => {
    parseProductsId(products).forEach((el) => {
      try {
        dispatch(getReviews(el));
      } catch (e) {
        return e;
      } });
  }, [products, dispatch]);

  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={'/catalog'} element={<Header />}>
          <Route index element={<Catalog/>}/>
          <Route path={`${AppRoutes.Product}/:id`} element={<Product/>}/>
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}


export default App;
