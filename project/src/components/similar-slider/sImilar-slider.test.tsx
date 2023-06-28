import { screen, render } from '@testing-library/react';
import SimilarSlider from './similar-slider';
import { CardProductInfo } from '../../types/types';
import { CategoryProduct, Mastery, TypeProduct } from '../../consts';
import { BrowserRouter } from 'react-router-dom';

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


describe('Similar-slider', () => {
  it('should render similar slider', () => {
    render(
      <BrowserRouter>
        <SimilarSlider data={productArray}/>
      </BrowserRouter>
    );

    expect(screen.getAllByTestId('product-card-test')).toBeTruthy();
  });
});
