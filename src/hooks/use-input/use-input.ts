import { useState } from 'react';

//'is-invalid'
const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const [ isDirty, setIsDerty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const onChange = (data: string) => {
    setIsValidHandler(data);
    setValue(data);
  };

  const onBlur = ( data: string) => {
    setIsValidHandler(data);
    setIsDerty(true);

  };

  const clearInput = () => {
    setValue('');
  };

  //внутренняя функция для проверки входящего значения
  const setIsValidHandler = (s: string) => {
    if ( s.trim() === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return {
    isValid,
    value,
    onBlur,
    onChange,
    clearInput,
    isDirty,
    setIsDerty
  };
};


export default useInput;
