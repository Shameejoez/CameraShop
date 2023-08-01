import { AxiosInstance } from 'axios';
import { CardProductInfo, PromoProduct, Review, sendRewiew } from '../types/types';
import { getCameras, getCamera, getSimilarCameras, getReviews, getPromo, postReview } from './action';
import { ApiRoutes, CategoryProduct, Mastery, TypeProduct } from '../consts';
import { configureMockStore } from '@jedmao/redux-mock-store';
import mockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { State } from '../types/state';
import {Action} from 'redux';

window.open = jest.fn();

const commentToSend: sendRewiew = {
  advantage: 'Ва ва ваааууууу',
  disadvantage: 'фу фу фиииии',
  cameraId: 88,
  rating: 4,
  review: 'Ну ни че так',
  userName: 'Зина'
};

const reviews: Review [] = [{
  advantage: 'Ва ва ваааууууу',
  disadvantage: 'фу фу фиииии',
  cameraId: 88,
  createAt: '18.12.12',
  id: '44',
  rating: 5,
  review: 'Ну ни че так',
  userName: 'Puma'

}];

const promo: PromoProduct = {
  id: 221,
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
    category:  CategoryProduct.Camera,
    description:  'Новое слово в создании моментальных фото. Высокое качество снимков, легко перезаряжаемые кассеты, встроенная вспышка. Создавайте альбомы здесь и сейчас.',
    id: 2,
    level: Mastery.Professional,
    name: 'FastShot MR-5',
    previewImg: 'img/content/fast-shot.jpg',
    previewImg2x: 'img/content/fast-shot@2x.jpg',
    previewImgWebp: 'img/content/fast-shot.webp',
    previewImgWebp2x: 'img/content/fast-shot@2x.webp',
    price: 18970,
    reviewCount: 17,
    type: TypeProduct.Digital,
    vendorCode: 'JH34KHN895',
  },
  {
    category: CategoryProduct.Camera,
    description: 'Компактная модель позволяющая получать чёткие снимки с 25-кратным зумом. В комплекте зарядное устройство и бархатный чехол, а так же удобный шнурок на шею.',
    id: 3,
    level: Mastery.Professional,
    name: 'Instaprinter P2',
    previewImg: 'img/content/instaprinter.jpg',
    previewImg2x: 'img/content/instaprinter@2x.jpg',
    previewImgWebp: 'img/content/instaprinter.webp',
    previewImgWebp2x: 'img/content/instaprinter@2x.webp',
    price: 8430,
    reviewCount: 44,
    type: TypeProduct.Digital,
    vendorCode: 'KLU789GH56',
  }
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
global.window ??= Object.create(window);
const url = 'http://localhost';
Object.defineProperty(window, 'location', {
  value: {
    href: url,
  },
  writable: true,
});

describe('fetch products data', () => {

  const api = createAPI();
  let mockAPI = new mockAdapter(api);
  const middlewares = [thunk.withExtraArgument({api})];

  afterEach(() => {

    mockAPI = new mockAdapter(api);

  });

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, {api: AxiosInstance}, Action>
  >(middlewares);

  const store = mockStore();

  describe('getCameras', () => {
    it('should return 200 and array as CardProductInfo[]', async() => {
      mockAPI
        .onGet(ApiRoutes.cameras)
        .reply(200, productArray);


      const response = await store.dispatch(getCameras());

      expect(mockAPI.history.get[0].url).toEqual(ApiRoutes.cameras);
      expect(response.payload).toEqual(productArray);

    });

    it('should return 400 and empty array', async() => {
      mockAPI
        .onGet(ApiRoutes.cameras)
        .networkError();

      const response = await store.dispatch(getCameras());

      expect(response.type).toEqual('get/cameras/rejected');
    });

  });

  describe('getCamera', () => {
    it('sould return 200 & current product', async() => {
      mockAPI
        .onGet(`${ApiRoutes.cameras}/${productArray[0].id}`)
        .reply(200, productArray[0]);

      const response = await store.dispatch(getCamera(productArray[0].id));

      expect(mockAPI.history.get[0].url).toEqual(`${ApiRoutes.cameras}/${productArray[0].id}`);
      expect(response.payload).toEqual(productArray[0]);
    });

    it('should return undefined', async() => {
      mockAPI
        .onGet(`${ApiRoutes.cameras}/${productArray[0].id}`)
        .reply(404, undefined);

      const response = await store.dispatch(getCamera(productArray[0].id));

      expect(response.payload).toEqual(undefined);
    });
  });

  describe('getSimilar', () => {
    it('should return similar array', async() => {
      mockAPI
        .onGet(`${ApiRoutes.cameras}/${productArray[0].id}${ApiRoutes.similar}`)
        .reply(200, productArray);

      const response = await store.dispatch(getSimilarCameras(productArray[0].id));

      expect(response.payload).toEqual(productArray);
    });

  });

  describe('getReviews', () => {
    it('should return an array of reviews for the selected product' , async() => {

      mockAPI
        .onGet(`${ApiRoutes.cameras}/${productArray[0].id}${ApiRoutes.reviews}`)
        .reply(200, reviews);

      const response = await store.dispatch(getReviews(productArray[0].id));

      expect(response.payload).toEqual(reviews);
    });
  });

  describe('getPromo', () => {
    it ('shold return status 200 & available product', async() => {

      mockAPI
        .onGet(ApiRoutes.promo)
        .reply(200, promo);

      const response = await store.dispatch(getPromo());

      expect(response.payload).toEqual(promo);
    });
  });

  describe('postReview', () => {
    it ('shold return status 200 & get new review', async() => {

      mockAPI
        .onPost(ApiRoutes.reviews, commentToSend)
        .reply(200, reviews[0]);

      const response = await store.dispatch(postReview(commentToSend));

      expect(response.payload).toEqual(reviews[0]);
    });
  });

});


