import { fireEvent, renderHook } from '@testing-library/react';
import useKeyDownEsc from './use-key-down-esc';


describe('useKeyDownEsc', () => {
  it('the element should close if it is rendered', () => {
    const isVisible = 'is-active';
    const setVisible = jest.fn();
    const target = document.createElement('div');
    document.body.appendChild(target);
    target.className = isVisible;


    const view = renderHook(() => useKeyDownEsc({ handler: setVisible, isVisible }));

    expect(setVisible).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(document, {key: 'Escape', charCode: 27, code: 'Escape',});
    expect(setVisible).toHaveBeenCalledTimes(1);

    jest.spyOn(document, 'removeEventListener');

    view.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);

  });

  it('should do nothing if element is closed', () => {
    const isVisible = '';
    const setVisible = jest.fn();
    const target = document.createElement('div');
    document.body.appendChild(target);
    target.className = isVisible;

    renderHook(() => useKeyDownEsc({ handler: setVisible, isVisible }));

    expect(setVisible).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(document, {key: 'Escape', charCode: 27, code: 'Escape',});
    expect(setVisible).toHaveBeenCalledTimes(0);
  });
});
