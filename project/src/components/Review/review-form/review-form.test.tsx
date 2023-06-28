import { screen, render, fireEvent } from '@testing-library/react';
import { createAPI } from '../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { AppRoutes, CategoryProduct, Mastery, SlicerName, TypeProduct } from '../../../consts';
import { CardProductInfo } from '../../../types/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import App from '../../app/app';
import browserHistory from '../../../browser-history';

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
  }
});


const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('ReviewForm', () => {

  it('should render ReviewForm', () => {
    browserHistory.push(`${AppRoutes.Catalog}/${AppRoutes.Product}/1`);
    render(fakeApp);

    const addComment = screen.getByRole('button', {name: 'Оставить свой отзыв'});
    fireEvent.click(addComment);

    const mockTypingEvent = { target: { value: 'Антон'}};
    const nameInput = screen.getByRole('textbox', {name: 'Ваше имя'});
    const advantageInput = screen.getByRole('textbox', {name: 'Достоинства'});
    const disadvantageInput = screen.getByRole('textbox', {name: 'Недостатки'});
    const reviewInput = screen.getByRole('textbox', {name: 'Комментарий'});

    fireEvent.change(nameInput , mockTypingEvent);
    fireEvent.change(advantageInput , mockTypingEvent);
    fireEvent.change(disadvantageInput , mockTypingEvent);
    fireEvent.change(reviewInput , mockTypingEvent);

    expect((nameInput as HTMLInputElement).value).toBe('Антон');
    expect((advantageInput as HTMLInputElement).value).toBe('Антон');
    expect((disadvantageInput as HTMLInputElement).value).toBe('Антон');
    expect((reviewInput as HTMLInputElement).value).toBe('Антон');
  });

});
