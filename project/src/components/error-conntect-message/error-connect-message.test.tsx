import { screen, render } from '@testing-library/react';
import ErrorConnectMessage from './error-connect-message';


describe('ErrorConnectMessage', () => {

  it('should render ErrorConnectMessage', () => {
    render (
      <ErrorConnectMessage isVisible={'is-active'} />
    );

    expect(screen.getByRole('button', {name: 'Перезагрузить страницу'})).toBeInTheDocument();
  });
});
