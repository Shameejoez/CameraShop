import { screen, render } from '@testing-library/react';
import Footer from './Footer';


describe('Footer', () => {
  it('should render footer', () => {
    render(<Footer/>);

    expect(screen.getByText('Навигация' && 'Каталог' && 'Гарантии' && 'Доставка' &&
         'О компании' && 'Ресурсы' && 'Блог' && 'Курсы операторов' && 'Сообщество' && 'Поддержка' && 'FAQ' && 'Задать вопрос')).toBeInTheDocument();

  });
});

