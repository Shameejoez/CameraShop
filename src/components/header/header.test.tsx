import { screen, render } from '@testing-library/react';
import 'react-router-dom';
import { CardProductInfo } from '../../types/types';
import { AppRoutes, CategoryProduct, Mastery, SlicerName, TypeProduct } from '../../consts';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import App from '../app/app';
import browserHistory from '../../browser-history';


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

const api = createAPI();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

mockApi
  .onGet(`${AppRoutes.Catalog}`)
  .reply(200, productArray);

const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [SlicerName.DataProcess]: {
    cameras: productArray,
    camera: productArray[0],
    similar: productArray,
    reviews: [],
    promo: null,
    ratingArray: [{
      id: 1,
      currentRating: 3
    }]

  }
});

const fakeApp = (
  <Provider store={store}>
    <App/>
  </Provider>
);

describe('Header', () => {
  it('should render header', () => {
    browserHistory.push('/catalog');
    render(fakeApp);

    expect(screen.getByTestId('header-test')).toBeInTheDocument();
  });
});
