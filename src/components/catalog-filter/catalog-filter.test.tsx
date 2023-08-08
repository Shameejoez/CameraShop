import { screen, render, fireEvent} from '@testing-library/react';
import { CardProductInfo, PromoProduct } from '../../types/types';
import { AppRoutes, CategoryProduct, CuponStatus, LoadingStatus, Mastery, PriceRange, SlicerName, SortMode, SortName, TypeProduct } from '../../consts';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import App from '../app/app';
import browserHistory from '../../browser-history';

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
      isValid: CuponStatus.Vaild
    }
  }
});


const fakeApp = (

  <Provider store={store}>
    <App />
  </Provider>

);

describe('Catalog-filter', () => {
  it('should render catalog-filter', async() => {

    browserHistory.push(AppRoutes.Catalog);
    render(fakeApp);
    const chekOne = await screen.findByRole('checkbox', {name: 'Коллекционная'} , {timeout: 2000});
    const chekTwo = await screen.findByRole('checkbox', {name: 'Моментальная'} , {timeout: 2000});
    const chekThree = await screen.findByRole('checkbox', {name: 'Цифровая'} , {timeout: 2000});
    const chekFour = await screen.findByRole('checkbox', {name: 'Плёночная'} , {timeout: 2000});
    const chekSix = await screen.findByRole('checkbox', {name: 'Фотокамера'} , {timeout: 2000});
    const chekSeven = await screen.findByRole('checkbox', {name: 'Нулевой'} , {timeout: 2000});
    const chekEight = await screen.findByRole('checkbox', {name: 'Любительский'} , {timeout: 2000});
    const chekNine = await screen.findByRole('checkbox', {name: 'Профессиональный'} , {timeout: 2000});

    fireEvent.click(chekOne);
    fireEvent.click(chekTwo);
    fireEvent.click(chekThree);
    fireEvent.click(chekFour);
    fireEvent.click(chekSix);
    fireEvent.click(chekSeven);
    fireEvent.click(chekEight);
    fireEvent.click(chekNine);
    expect(chekOne).toBeChecked();
    expect(chekThree).toBeChecked();
    expect(chekSix).toBeChecked();
    expect(chekSeven).toBeChecked();
    expect(chekNine).toBeChecked();
    expect(chekFour).toBeChecked();
    expect(chekTwo).toBeChecked();
  });

  it('should checking Видеокамера', async() => {
    render(fakeApp);
    const chekFive = await screen.findByRole('checkbox', {name: 'Видеокамера'}, {timeout: 2000});
    fireEvent.click(chekFive);
    expect(chekFive).toBeChecked();
  });
});
