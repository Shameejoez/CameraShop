import { Route, Routes, } from 'react-router-dom';
import Catalog from '../../pages/catalog';
import Header from '../header/header';
import { AppRoutes } from '../../consts';
import Product from '../../pages/product';
import NotFound from '../not-found/not-found';
import HistoryRouter from '../history-router.tsx/history-router';
import browserHistory from '../../browser-history';
import { useEffect } from 'react';
import { parseProductsId } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { takeCameras } from '../../store/data-process/data-selectors';
import { getReviews } from '../../store/action';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(takeCameras);

  const parseIds = parseProductsId(cameras);
  useEffect(() => {
    if (parseIds) {
      parseIds.forEach((el) => {
        dispatch(getReviews(el));
      });
    }

  }, [cameras, dispatch]);

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
