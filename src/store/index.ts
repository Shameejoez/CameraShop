import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { getCameras, getReviews } from './action';
import { parseProductsId } from '../utils';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    thunk: {
      extraArgument: {
        api
      }
    }
  })
});


store.dispatch(getCameras());
setTimeout(() => {
  parseProductsId(store.getState()['DATA-PROCESS'].cameras).forEach((el) => {
    try {
      store.dispatch(getReviews(el));
    } catch (e) {
      return e;
    } });
}, 300);
