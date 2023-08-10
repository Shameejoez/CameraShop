import { Provider } from 'react-redux';
import App from './app';
import {render, screen, waitFor} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { AppRoutes, CategoryProduct, CouponStatus, LoadingStatus, Mastery, PriceRange, SlicerName, SortMode, SortName, TypeProduct } from '../../consts';
import browserHistory from '../../browser-history';
import { CardProductInfo, PromoProduct } from '../../types/types';

import userEvent from '@testing-library/user-event';

const promo: PromoProduct = {
  id: 1,
  name: 'Ретрокамера Dus Auge lV',
  previewImg: 'img/content/das-auge.jpg',
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
};

const productArray: CardProductInfo [] = [
  {
    category: CategoryProduct.Camcorder,
    description: `Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она 
      до сих пор пользуется популярностью среди коллекционеров 
      и яростных почитателей старинной техники. Вы тоже можете прикоснуться 
      к волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с Das Auge IV начнётся ваш путь к
      наградам всех престижных кинофестивалей.`,
    id: 1,
    level: Mastery.Amateur,
    name: 'Ретрокамера Dus Auge lV',
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    price: 73450,
    reviewCount: 5,
    type: TypeProduct.Collectible,
    vendorCode: 'DA4IU67AD5',
  }
];

global.scrollTo = jest.fn();
const api = createAPI();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

mockApi
  .onGet(`${AppRoutes.Catalog}${AppRoutes.Product}/1`)
  .reply(200, productArray[0]);


const mockStore = configureMockStore(middlewares);


const store = mockStore({
  [SlicerName.DataProcess]: {
    cameras: productArray,
    camera: productArray[0],
    similar: productArray,
    reviews: [],
    promo: promo,
    ratingArray: [{
      id: 1,
      currentRating: 3
    }]
  },
  [SlicerName.FilterProcces]: {
    currentSort: {
      name: SortName.Unknown,
      mode: SortMode.Increase
    },
    filter: {
      category: null,
      level: [],
      type: []
    },
    rangePrice: {
      min: PriceRange.Min,
      max: PriceRange.Max,
    }
  },
  [SlicerName.BasketProcess]: {
    myCameras: productArray.map((el) => ({...el, count: 3})),
    addedCoupon: 'camera-333',
    totalPrice: productArray[0].price * 3,
    orderPostStatus: LoadingStatus.Unknown,
    discount:{
      count: 15,
      isValid: CouponStatus.Vaild
    }
  }
});

const fakeApp = (

  <Provider store={store}>
    <App />
  </Provider>

);

describe('Main tests', () => {

  it('should return "catalog"  when user navigates to "/catalog', async() => {
    browserHistory.push(AppRoutes.Catalog);
    render(fakeApp);

    await waitFor(() => {
      screen.getByText('Каталог фото- и видеотехники');
      screen.getAllByTestId('product-card-test');
      screen.getAllByText('Ретрокамера Dus Auge lV');
      screen.getAllByText('Купить' && 'Подробнее');
      screen.getByTestId('banner-test');
      screen.getByTestId('footer-test');
    });
  });

  it('if click Promo "Подробнее" should render promo-products page', async() => {
    browserHistory.push(AppRoutes.Catalog);
    render(fakeApp);
    const promoBtn = await screen.findByTestId('promo-link' , {}, {timeout: 2000});
    userEvent.click(promoBtn);

    await waitFor(() =>screen.findByTestId('productid-test'));
  });

  it('should return "Product"  when user navigates to "/product/:id', async() => {
    render(fakeApp);

    await waitFor(() => {
      screen.getAllByText('Характеристики' && 'Описание');
      screen.getAllByText(/Ретрокамера Dus Auge lV/i );
      screen.getAllByRole('img');
      screen.getByTestId('footer-test');
    }, {timeout: 4000});
  });

  describe('ReviewForm', () => {
    it('should render Review Form', async() => {
      render(fakeApp);
      const addComment = await screen.findByRole('button', {name: 'Оставить свой отзыв' }, {timeout: 2000});
      userEvent.click(addComment);
      await screen.findByTestId('review-form-test' , {}, {timeout: 2000});
    });
  });

  it('should render basket item', async() => {
    browserHistory.replace(`/${AppRoutes.Basket}`);
    render(fakeApp);
    expect(await screen.findByRole('button', {name: 'Оформить заказ'}, {timeout: 2000})).toBeInTheDocument();
    expect(await screen.findByRole('heading', {name: 'Корзина'}, {timeout: 2000})).toBeInTheDocument();
  });
});


