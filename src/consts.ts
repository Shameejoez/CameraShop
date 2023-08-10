import { CardProductInfo } from './types/types';

export const SLIDER_STEP = 955; //пиксели шаг слайдера
export const COUNT_SLIDER_VISIBLE_ELEMENT = 3;
export const START_SLIDER_POSITION = 0;
export const STARS_COUNT = 5;
export const REVIEW_COUNT = 3; // количесто отызов в одном блоке
export const PRODUCTS_ON_PAGE = 9;

export enum CouponStatus {
  Rejected = 'rejected',
  NotValid = 'notValid',
  Vaild = 'valid',
  Unknown = 'unknow'
}

export enum SetFilterMode {
  Push = 'push',
  Unshift = 'unshift'
}

export enum SortTypeId {
  SortPopular = 'sortPopular',
  SortPrice = 'sortPrice',
  SortIncrease = 'up',
  SortDecrease = 'down'
}

export enum PriceRange {
  Min = 1990,
  Max = 199000
}
export enum DateFormat {
  commentFormat = 'D MMMM'
}

export enum SortName {
  Price = 'price',
  Rating = 'rating',
  Unknown = 'unknown'
}

export enum SortMode {
  Increase = 'Increase',
  Decrease = 'Decrease',
  Unknown = 'unknown'
}

export enum BasketPopupStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum LoadingStatus {
  Pending = 'pending',
  Rejected = 'rejected',
  Fullfield = 'fullfield',
  Unknown = 'unknown'
}

export const ReviewCustomInputData = [
  {
    placeholder: 'Введите ваше имя',
    labelSpan: 'Ваше имя',
    errorMessage: 'Нужно указать имя'
  },
  {
    placeholder: 'Основные преимущества товара',
    labelSpan: 'Достоинства',
    errorMessage: 'Нужно указать достоинства'
  },
  {
    placeholder: 'Главные недостатки товара',
    labelSpan: 'Недостатки',
    errorMessage: 'Нужно указать недостатки'
  },
];


export const RatingStarCategories = [ 'Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Ужасно'];

export enum HashName {
  Characteristic = '#characteristic',
  Description = '#description'
}

export enum FilterCategoryName {
   Category = 'Категория',
   Type ='Тип камеры',
   Mastery = 'Уровень',
}

export enum ProductCharacteristic {
  Category = 'Категория',
  Type ='Тип камеры',
  Mastery = 'Уровень',
  vendorCode = 'Артикул'
}

export enum TypeProduct {
    Collectible = 'Цифровая',
    Instant = 'Плёночная',
    Digital = 'Моментальная',
    Film = 'Коллекционная',
}

export enum Unknown {
  Unknown = 'unknow'}

export enum CategoryProduct {
    Camcorder = 'Фотокамера',
    Camera = 'Видеокамера'
}

export enum Mastery {
    Null = 'Нулевой',
    Amateur = 'Любительский',
    Professional = 'Профессиональный'
}

export enum SlicerName {
    DataProcess = 'DATA-PROCESS',
    SiteProcces = 'SITE-PROCESS',
    UserProcess = 'USER-PROCESS',
    FilterProcces = 'FILTER-PROCESS',
    BasketProcess = 'BASKET-PROCESS'
}

export enum ApiRoutes {
    reviews = '/reviews',
    cameras = '/cameras',
    similar = '/similar',
    coupon = '/coupons',
    promo = '/promo',
    order = '/orders',
}

export enum AppRoutes {
    Catalog = 'catalog',
    Product = 'product',
    Reviews = '/rewiews',
    Basket = 'basket'
}


export enum HeaderNames {
  Catalog = 'Каталог',
  Guarantees = 'Гарантии',
  Delivery = 'Доставка',
  AboutCompany = 'О компании',
}

export enum PaginationElements {
  Next = 'Далее'
}

export const FooterNavLiElements = [
  {
    name: 'Навигация',
    elements: ['Каталог', 'Гарантии', 'Доставка', 'О компании',]
  },
  {
    name: 'Ресурсы',
    elements: ['Блог', 'Курсы операторов', 'Сообщество',]
  },
  {
    name: 'Поддержка',
    elements: ['FAQ', ' Задать вопрос']
  }
];

export const SocialIcons = [
  {
    name: 'вконтакте',
    icon:'#icon-vk'

  },
  {
    name: 'пайнтерест',
    icon:'#icon-pinterest'

  },
  {
    name: 'рэддит',
    icon:'#icon-reddit'
  },
];

export const defaultCard: CardProductInfo = // заглушка для попапа из корзины
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
  };

export const RAITING_COUNT = 5;


