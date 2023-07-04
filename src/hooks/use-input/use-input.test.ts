import { fireEvent, renderHook } from '@testing-library/react';
import useInput from './use-input';
import { act } from 'react-dom/test-utils';

describe('useInput', () => {
  it('should inputs value to equal argument', () => {

    const {result} = renderHook(() => useInput('Блабаблабла'));


    expect(result.current.value).toBe('Блабаблабла');

  });

  it('should clearInput clears the field', () => {
    const {result} = renderHook(() => useInput('Блабаблабла'));

    act(() =>
      result.current.clearInput());
    expect(result.current.value).toBe('');

  });

  it('should onBlur is work', () => {
    const targetInput = document.createElement('input');
    document.body.appendChild(targetInput);

    const {result} = renderHook(() => useInput(targetInput.value));

    targetInput.addEventListener('blur', () => result.current.onBlur(targetInput.value));
    fireEvent.click(targetInput);
    fireEvent.blur(targetInput);

    expect(result.current.isDirty).toBe(true);
  });

  it('should setIsDirty is work', () => {
    const {result} = renderHook(() => useInput(''));

    act(() =>
      result.current.setIsDerty(true));

    expect(result.current.isDirty).toBe(true);
  });

  it('should setIsValid !isValid if input is empty', () => {
    const targetInput = document.createElement('input');
    document.body.appendChild(targetInput);
    targetInput.value = '';
    const {result} = renderHook(() => useInput(targetInput.value));

    expect(result.current.isValid).toBe(false);


  });

  it('if use onChange shoul isValid', () => {
    const {result} = renderHook(() => useInput(''));

    act(() =>
      result.current.onChange('Блаблабла'));

    expect(result.current.isValid).toBe(true);

  });

});
