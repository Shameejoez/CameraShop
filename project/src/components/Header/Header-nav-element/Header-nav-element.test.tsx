import { screen, render } from '@testing-library/react';
import HeaderNavElement from './Header-nav-element';
import { HeaderNames } from '../../../consts';


describe('HeaderNavElement', () => {
  it('should render HeaderNavElevent', () => {
    render(<HeaderNavElement name={HeaderNames.Catalog}/>);

    expect(screen.getByText(HeaderNames.Catalog)).toBeInTheDocument();
  });
});
