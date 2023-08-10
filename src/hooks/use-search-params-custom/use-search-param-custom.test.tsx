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

const promo: PromoProduct = {
  id: 1,
  name: 'Ретрокамера Dus Auge lV',
  previewImg: 'img/content/das-auge.jpg',
  previewImg2x: 'img/content/das-auge@2x.jpg',
  previewImgWebp: 'img/content/das-auge.webp',
  previewImgWebp2x: 'img/content/das-auge@2x.webp',
};

const changeId = (mockProducts: CardProductInfo []) =>
  mockProducts.map((el, i) => ({
    ...el,
    category: CategoryProduct.Camcorder,
    description: `${i}.`,
    id: i,
    level: Mastery.Amateur,
    name: `${i}.`,
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    price: 73450,
    reviewCount: 5,
    type: TypeProduct.Collectible,
    vendorCode: 'DA4IU67AD5',
  }));


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

const cameras: CardProductInfo [] = changeId([productArray[0], productArray[0], productArray[0], productArray[0], productArray[0]
  , productArray[0], productArray[0], productArray[0], productArray[0], productArray[0], productArray[0], productArray[0], productArray[0]]);


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
    cameras: cameras,
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

describe('useSearchParamsCustom', () => {

  describe('filterParams', () => {
    it('shold filterParams is works', async() => {
      browserHistory.replace('/catalog');
      render(fakeApp);

      const chekOne = await screen.findByText('Коллекционная', {}, {timeout: 2000});
      userEvent.click(chekOne);
      await waitFor(() => expect(browserHistory.location.search).toBe('?filters=%D0%9A%D0%BE%D0%BB%D0%BB%D0%B5%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F&page=1'));

    });
  });
  describe('setPageParams', () => {
    it('should pageParams is works', async() => {
      browserHistory.replace('/catalog');
      render(fakeApp);

      const activeButton = await screen.findByTestId('2-pag-test', {}, {timeout: 2000});

      userEvent.click(activeButton);
      await waitFor(() => expect(browserHistory.location.search).toBe('?page=2'));

    });
  });

  describe('setPriceParams', () => {
    it('should render priceParams', async() => {
      browserHistory.replace(AppRoutes.Catalog);
      render(fakeApp);

      const minPrice = await screen.findByTestId('priceDown-test', {}, {timeout: 2000});

      userEvent.type(minPrice , '1990');
      await waitFor(() => expect(browserHistory.location.search).toBe('?page=1&priceMin=1990'), {timeout: 2000});
    });
  });

  describe('setSortParams', () => {
    it('should render sortTypeParams', async() => {
      browserHistory.replace(AppRoutes.Catalog);
      render(fakeApp);
      const sortRating = await screen.findByText(/по популярности/i , {}, {timeout: 2000});

      userEvent.click(sortRating);
      await waitFor(() => expect(browserHistory.location.search).toBe('?sort=sortPopular&sortOrder=up'), {timeout: 2000} );
    });

  });

  describe('sortModeParams', () => {
    it('should render sortModeParams', async() => {
      browserHistory.replace(AppRoutes.Catalog);
      render(fakeApp);
      const modeUp = await screen.findByTestId('down-test', {}, {timeout: 2000});
      userEvent.click(modeUp);
      await waitFor(() => expect(browserHistory.location.search).toBe('?sortOrder=down&sort=sortPrice'), {timeout: 2000} );
    });
  });
});
