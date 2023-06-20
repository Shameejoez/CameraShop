import { Provider } from 'react-redux';
import App from './app';
import {fireEvent, render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { AppRoutes, CategoryProduct, Mastery, SlicerName, TypeProduct } from '../../consts';
import browserHistory from '../../browser-history';
import { CardProductInfo, PromoProduct } from '../../types/types';

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
    promo: promo
  }
});


const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('Main tests', () => {

  it('should return "catalog"  when user navigates to "/catalog', () => {
    browserHistory.push(AppRoutes.Catalog);
    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card-test')).toBeTruthy();
    expect(screen.getAllByText('Ретрокамера Dus Auge lV')).toBeTruthy();
    expect(screen.getAllByText('Купить' || 'Подробнее')).toBeTruthy();
    expect(screen.getByTestId('banner-test')).toBeInTheDocument();
    expect(screen.getByTestId('footer-test')).toBeInTheDocument();
  });

  it('if click Promo "Подробнее" should render promo-products page', () => {
    render(fakeApp);
    const promoBtn = screen.getByTestId('promo-link');
    fireEvent.click(promoBtn); // при нажатии на эту кнопку происходить переход на "/product/:id" по этому browserHistory.push(anyRoute); не написал

    expect(screen.getByTestId('productid-test')).toBeInTheDocument();

  });

  it('should return "Product"  when user navigates to "/product/:id', () => {
    render(fakeApp);
    expect(screen.getByText('Характеристики' && 'Описание')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
    expect(screen.getAllByText(/Ретрокамера Dus Auge lV/i)).toBeTruthy();
    expect(screen.getAllByRole('img')).toBeTruthy();
    expect(screen.getByTestId('footer-test')).toBeInTheDocument();

  });

});

describe('ReviewForm', () => {
  it('should render Review Form', () => {
    render(fakeApp);
    const addComment = screen.getByRole('button', {name: 'Оставить свой отзыв'});
    fireEvent.click(addComment);
    const modal = screen.getByTestId('review-form-test');
    expect(addComment).toBeInTheDocument();
    expect(modal).toHaveClass('is-active');
  });

});
