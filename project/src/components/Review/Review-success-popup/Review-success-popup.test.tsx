import { fireEvent, render, screen } from '@testing-library/react';
import ReviewSucsessPopup from './Review-sucsess-popup';


describe('ReviewSucsessPopup', () => {
  const setVisible = jest.fn();
  it('should render ReviewSucsessPopup and btnClosed work', () => {
    render(<ReviewSucsessPopup isVisible="is-active" setIsVisible={setVisible}/>);

    const btnClosed = screen.getByRole('button', {name: 'Закрыть попап'});


    fireEvent.click(btnClosed);


    expect(setVisible).toBeCalled();

  });
  it('should render ReviewSucsessPopup and btnSuccess work', () => {
    render(<ReviewSucsessPopup isVisible="is-active" setIsVisible={setVisible}/>);


    const btnSuccess = screen.getByRole('button', {name: 'Вернуться к покупкам'});


    fireEvent.click(btnSuccess);

    expect(setVisible).toBeCalled();
  });
});
