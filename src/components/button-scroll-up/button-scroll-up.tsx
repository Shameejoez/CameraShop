type ButtonScrollUpProps = {
    onScrollUp: () => void;
}


function ButtonScrollUp ({onScrollUp}: ButtonScrollUpProps): JSX.Element {
  return (
    <button className="up-btn" onClick={onScrollUp} aria-label="скролл на верх">
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </button>

  );
}


export default ButtonScrollUp;
