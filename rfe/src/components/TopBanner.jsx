import logo from "./images/logo.png";

export default function TopBanner({ setTopBanner }) {
  const handleClose = () => {
    setTopBanner(0);
  };
  return (
    <div className="topBanner">
      <div className="logo-container">
        <img src={logo} alt="Kolt logo" />
      </div>
      <button
        type="button"
        className="btn-close"
        onClick={handleClose}
      ></button>
    </div>
  );
}
