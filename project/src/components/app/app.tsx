import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Catalog from '../../pages/Catalog';
import Header from '../Header/Header';
import { AppRoutes } from '../../consts';
import Product from '../../pages/Product';
import NotFound from './Not-found';

function App(): JSX.Element {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NotFound/>} />
        <Route path={'/catalog'} element={<Header />}>
          <Route index element={<Catalog/>}/>
          <Route path={`${AppRoutes.Product}/:id`} element={<Product/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}


export default App;
