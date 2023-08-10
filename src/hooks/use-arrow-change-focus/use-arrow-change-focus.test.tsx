import { Provider } from 'react-redux';
import { render, screen, waitFor} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { AppRoutes, CategoryProduct, CouponStatus, LoadingStatus, Mastery, PriceRange, SlicerName, SortMode, SortName, TypeProduct } from '../../consts';
import browserHistory from '../../browser-history';
import { CardProductInfo, PromoProduct } from '../../types/types';
import userEvent from '@testing-library/user-event';
import App from '../../components/app/app';
import SearchBar from '../../components/header/search-bar/search-bar';
import { MemoryRouter } from 'react-router-dom';

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
  },
  {
    category: CategoryProduct.Camcorder,
    description: 'Немецкий',
    id: 21,
    level: Mastery.Amateur,
    name: 'ЫЫЫЫЫЫЫЫ',
    previewImg: 'img/content/das.jpg',
    previewImg2x: 'img/content/das.jpg',
    previewImgWebp: 'img/content/das.webp',
    previewImgWebp2x: 'img/content/das.webp',
    price: 73450,
    reviewCount: 5,
    type: TypeProduct.Collectible,
    vendorCode: 'DA4IU67AD5',
  }
];

window.blur = jest.fn();
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

describe('useArrowChangeFocus', () => {
  it('should useArrowChangeFocus is works if push ArrowDown', async() => {
    browserHistory.push(AppRoutes.Catalog);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </Provider>);

    const searchInput = await screen.findByPlaceholderText('Поиск по сайту', {}, {timeout: 2000});

    userEvent.type(searchInput, 'ЫЫЫЫЫЫЫЫ');

    const lowerElement = await screen.findByTestId('21', {}, {timeout: 2000});
    userEvent.keyboard('[ArrowUp]');
    await waitFor(() =>expect(lowerElement).toHaveFocus());
  });

  it('should useArrowChangeFocus is works', async() => {
    browserHistory.replace(AppRoutes.Catalog);
    render(fakeApp);

    const searchInput = await screen.findByPlaceholderText('Поиск по сайту', {}, {timeout: 2000});
    userEvent.type(searchInput, 'ЫЫЫЫЫЫЫЫ');

    const lowerElement = await screen.findByTestId('21', {}, {timeout: 2000});
    userEvent.keyboard('[ArrowUp]');


    await waitFor(() =>expect(lowerElement).toHaveFocus());
  });
});

