import { Route, Routes, } from 'react-router-dom';
import Catalog from '../../pages/catalog';
import Header from '../meder/header';
import { AppRoutes } from '../../consts';
import Product from '../../pages/product';
import NotFound from '../not-found/not-found';
import HistoryRouter from '../history-router.tsx/history-router';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={'/catalog'} element={<Header />}>
          <Route index element={<Catalog/>}/>
          <Route path={`${AppRoutes.Product}/:id`} element={<Product/>}/>
        </Route>
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}


export default App;
