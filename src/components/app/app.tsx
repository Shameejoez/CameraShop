import { Route, Routes, } from 'react-router-dom';
import Catalog from '../../pages/catalog';
import Header from '../header/header';
import { AppRoutes, LoadingStatus} from '../../consts';
import Product from '../../pages/product';
import NotFound from '../not-found/not-found';
import HistoryRouter from '../history-router.tsx/history-router';
import browserHistory from '../../browser-history';
import { useEffect, useState } from 'react';
import { parseProductsId } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { takeCameras, takeGetCamerasStatus } from '../../store/data-process/data-selectors';
import { getReviews } from '../../store/action';
import Spinner from '../spinner/spinner';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const getCamerasStatus = useAppSelector(takeGetCamerasStatus);
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(takeCameras);

  const parseIds = parseProductsId(cameras);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (parseIds) {
      parseIds.forEach((el) => {
        dispatch(getReviews(el));
      });
    }

  }, [cameras, dispatch]);

  if (loading || getCamerasStatus === LoadingStatus.Pending) {
    return (
      <Spinner/>
    );
  }

  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={'/catalog'} element={<Header />}>
          <Route index element={<Catalog/>}/>
          <Route path={`${AppRoutes.Product}/:id`} element={<Product/>}/>
        </Route>
        <Route path={'*'} element={<NotFound />}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
