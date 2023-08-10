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
import Basket from '../../pages/basket';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const getCamerasStatus = useAppSelector(takeGetCamerasStatus);
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(takeCameras);
  const [addBasketVisible, setAddBasket] = useState<string>('');
  const [basketSucessViisble, setBasketSucess] = useState<string>('');

  const setAddBasketHandler = (isActive: string) => {
    setAddBasket(isActive);
  };
  const setBasketSucessHandler = (isActive: string) => {
    setBasketSucess(isActive);
  };

  const parseIds = parseProductsId(cameras);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

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
        <Route element={<Header />}>
          <Route path={'/catalog'} index element={
            <Catalog isActiveAddBasket={addBasketVisible} isActiveSuccessBasket={basketSucessViisble}
              onClickBasketSucess={setBasketSucessHandler} onClickSetBasketAdd={setAddBasketHandler}
            />
          }
          />
          <Route path={`${AppRoutes.Product}/:id`} element={
            <Product isActiveAddBasket={addBasketVisible} isActiveSuccessBasket={basketSucessViisble}
              onClickBasketSucess={setBasketSucessHandler} onClickSetBasketAdd={setAddBasketHandler}
            />
          }
          />
          <Route path={'basket'} element={
            <Basket isActiveAddBasket={addBasketVisible} isActiveSuccessBasket={basketSucessViisble}
              onClickBasketSucess={setBasketSucessHandler} onClickSetBasketAdd={setAddBasketHandler}
            />
          }
          />
        </Route>
        <Route path={'*'} element={<NotFound />}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
