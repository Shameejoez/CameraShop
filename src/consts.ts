export const SLIDER_STEP = 955; //пиксели шаг слайдера
export const COUNT_SLIDER_VISIBLE_ELEMENT = 3;
export const START_SLIDER_POSITION = 0;
export const STARS_COUNT = 5;
export const REVIEW_COUNT = 3; // количесто отызов в одном блоке
export const PRODUCTS_ON_PAGE = 9;

export enum DateFormat {
  commentFormat = 'D MMMM'
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
    Collectible = 'Коллекционная',
    Instant = 'Моментальная',
    Digital = 'Цифровая',
    Film = 'Плёночная',
}

export enum CategoryProduct {
    Camcorder = 'Видеокамера',
    Camera = 'Фотоаппарат'
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
    Reviews = '/rewiews'
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

export const RAITING_COUNT = 5;


