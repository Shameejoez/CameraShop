import { Provider } from 'react-redux';
import App from './app';
import {render, screen, waitFor} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { AppRoutes, CategoryProduct, Mastery, PriceRange, SlicerName, SortMode, SortName, TypeProduct } from '../../consts';
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
    const promoBtn = await screen.findByTestId('promo-link');
    userEvent.click(promoBtn);
    await screen.findByTestId('productid-test');

  });

  it('should return "Product"  when user navigates to "/product/:id', async() => {
    render(fakeApp);
    await screen.findAllByText('Характеристики' && 'Описание', {}, {timeout: 2000});
    await screen.findByText('Добавить в корзину' , {}, {timeout: 2000});
    await screen.findAllByText(/Ретрокамера Dus Auge lV/i , {}, {timeout: 2000});
    await screen.findAllByRole('img' , {}, {timeout: 2000});
    await screen.findByTestId('footer-test' , {}, {timeout: 2000});
  });

});

describe('ReviewForm', () => {
  it('should render Review Form', async() => {
    render(fakeApp);
    const addComment = await screen.findByRole('button', {name: 'Оставить свой отзыв' }, {timeout: 2000});
    await userEvent.click(addComment);
    await screen.findByTestId('review-form-test' , {}, {timeout: 2000});
  });
});
