import { Provider } from 'react-redux';
import App from '../../app/app';
import { fireEvent, render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../../services/api';
import { CategoryProduct, Mastery, TypeProduct, AppRoutes, SlicerName } from '../../../consts';
import browserHistory from '../../../browser-history';
import { CardProductInfo, Review, sendRewiew } from '../../../types/types';
import { ApiRoutes } from '../../../consts';
import { postReview } from '../../../store/action';
import { State } from '../../../types/state';
import { Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

const commentToSend: sendRewiew = {
  advantage: 'Ва ва ваааууууу',
  disadvantage: 'фу фу фиииии',
  cameraId: 88,
  rating: 4,
  review: 'Ну ни че так',
  userName: 'Зина'
};

const newReview: Review[] = [ {
  advantage: 'Ва ва ваааууууу',
  disadvantage: 'фу фу фиииии',
  cameraId: 88,
  rating: 4,
  review: 'Ну ни че так',
  userName: 'Зина',
  createAt: '18.08.1554',
  id: '123'
}];


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


const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, {api: AxiosInstance}, Action>
  >(middlewares);


const store = mockStore({
  [SlicerName.DataProcess]: {
    cameras: productArray,
    similar: productArray,
    reviews: newReview,
    camera: productArray[0]
  }
});


const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('RevieList', () => {

  it('the submitted comment should be rendered and rendered modal success', async() => {
    browserHistory.push(`${AppRoutes.Catalog}/${AppRoutes.Product}/1`);
    render(fakeApp);

    const addComment = screen.getByRole('button', {name: 'Оставить свой отзыв'});
    fireEvent.click(addComment);
    const reviewForm = screen.getByTestId('review-form-test');
    expect(reviewForm).toHaveClass('is-active');
    const submitReview = screen.getByRole('button', {name: 'Отправить отзыв'});

    mockApi
      .onPost(ApiRoutes.reviews, commentToSend)
      .reply(200, newReview);

    await store.dispatch(postReview(commentToSend));
    fireEvent.click(submitReview);


    expect(screen.getByText('Ну ни че так' && 'Ва ва ваааууууу' && 'фу фу фиииии' && 'Зина')).toBeInTheDocument();
  });
});

