import { ChangeEvent, useState } from 'react';

//'is-invalid'
const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const [ isDurty, setIsDerty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValidHandler(e.target.value);
    setValue(e.target.value);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValidHandler(e.target.value);
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
    isDurty,
    setIsDerty
  };
};


export default useInput;
