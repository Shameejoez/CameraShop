import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { getCameras, postCoupon } from './action';


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

if (localStorage.getItem('coupon')) {
  store.dispatch(postCoupon(JSON.parse(localStorage.getItem('coupon') as string) as string));
}

