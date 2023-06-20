import { Route, Routes, } from 'react-router-dom';
import Catalog from '../../pages/Catalog';
import Header from '../Header/Header';
import { AppRoutes } from '../../consts';
import Product from '../../pages/Product';
import NotFound from '../Not-found/Not-found';
import HistoryRouter from '../History-router.tsx/History-router';
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
