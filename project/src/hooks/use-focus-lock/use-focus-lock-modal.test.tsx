import useFocusLockModal from './use-focus-lock-modal';
import ReviewSucsessPopup from '../../components/review/review-success-popup/review-sucsess-popup';
import { screen, render, renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('useFocusLockModal', () => {

  const setIsVisible = jest.fn();

  it('useFocusLockModal should work', async () => {
    render(
      <BrowserRouter>
        <ReviewSucsessPopup isVisible='is-active' setIsVisible={setIsVisible}/>
      </BrowserRouter>
    );


    const modal = screen.getByTestId('modal-success-test');

    const ref = {
      current: modal as HTMLDivElement,
    };

    renderHook(() => useFocusLockModal({ ref: ref , isVisible: 'is-active' }));
    const successBtn = screen.getByRole('button', {name : 'Вернуться к покупкам'});
    const closedBtn = screen.getByRole('button', {name: 'Закрыть попап'});

    successBtn.focus();

    await userEvent.tab();
    expect(closedBtn).toHaveFocus();

    await userEvent.tab();
    expect(successBtn).toHaveFocus();


  });
});
