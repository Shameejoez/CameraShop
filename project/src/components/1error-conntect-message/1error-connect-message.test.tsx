import { screen, render } from '@testing-library/react';
import ErrorConnectMessage from './1error-connect-message';


describe('ErrorConnectMessage', () => {

  it('should render ErrorConnectMessage', () => {
    render (
      <ErrorConnectMessage isVisible />
    );

    expect(screen.getByRole('button', {name: 'Перезагрузить страницу'})).toBeInTheDocument();
  });
});
