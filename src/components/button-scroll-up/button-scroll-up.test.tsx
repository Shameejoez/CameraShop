import { screen, render, fireEvent } from '@testing-library/react';
import ButtonScrollUp from './button-scroll-up';


describe('ButtonScrollUp', () => {

  const onScrollUp = jest.fn(() => {
    window.scrollTo(0,0);
  });

  it('should  ButtonScrollUp is worked', () => {
    const highestDiv = document.createElement('div');
    render(
      <ButtonScrollUp onScrollUp={onScrollUp}/>
    );

    const upBtn = screen.getByRole('button', { name:'скролл на верх'});
    highestDiv.style.height = '10000px';
    document.body.appendChild(highestDiv);
    fireEvent.scroll(window, {target: {screenY: 5000}});
    fireEvent.click(upBtn);
    expect(onScrollUp).toBeCalledTimes(1);
  });
});
