import { Route, Routes, } from 'react-router-dom';
import Catalog from '../../pages/1catalog';
import Header from '../Header/1header';
import { AppRoutes } from '../../consts';
import Product from '../../pages/1rroduct';
import NotFound from '../1not-found/1not-found';
import HistoryRouter from '../1history-router.tsx/1history-router';
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
