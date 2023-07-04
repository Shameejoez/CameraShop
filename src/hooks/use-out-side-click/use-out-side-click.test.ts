import { fireEvent, renderHook } from '@testing-library/react';
import useOutsideClick from './use-out-side-click';

describe('useOutsideClick', () => {
  it('should handle outside click', () => {
    const isVisible = 'is-active';
    const setVisible = jest.fn();
    const target = document.createElement('div');
    document.body.appendChild(target);
    target.className = isVisible;


    const outside = document.createElement('div');
    document.body.appendChild(outside);

    const ref = {
      current: target,
    };

    const view = renderHook(() => useOutsideClick({ elementRef: ref, handler: setVisible, isVisible }));

    expect(setVisible).toHaveBeenCalledTimes(0);
    fireEvent.mouseUp(outside);
    expect(setVisible).toHaveBeenCalledTimes(1);

    jest.spyOn(document, 'removeEventListener');
    view.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if click on target element', () => {

    const isVisible = 'is-active';
    const target = document.createElement('div');
    document.body.appendChild(target);
    target.className = isVisible;

    const ref = {
      current: target,
    };

    const setVisible = jest.fn();

    renderHook(() => useOutsideClick({ elementRef: ref, handler: setVisible, isVisible }));

    expect(setVisible).toHaveBeenCalledTimes(0);
    fireEvent.click(target);
    expect(setVisible).toHaveBeenCalledTimes(0);
  });


});
