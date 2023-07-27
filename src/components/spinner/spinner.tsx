import { Vortex } from 'react-loader-spinner';

function Spinner (): JSX.Element {
  return (
    <div style={{width: '500px', height: '500px', margin: '100px auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}} data-testid={'spinner-test'}>
      <div className="header__label__spinner">
        <svg viewBox='-95 -60 226 135' aria-hidden="true">
          <use xlinkHref="#icon-label-spinner" />
        </svg>
      </div>
      <Vortex height={'500'} width={'500'} colors={['MediumSlateBlue', 'green', 'MediumSlateBlue', 'MediumSlateBlue', 'MediumSlateBlue', 'green']} wrapperStyle={{position: 'absolute'}}/>
    </div>);
}

export default Spinner;
