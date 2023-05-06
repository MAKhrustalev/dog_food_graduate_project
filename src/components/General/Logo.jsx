import { Link } from "react-router-dom"; // связь с линками
import logoImg from "../../assets/images/logo.png";

const Logo = () => (
  <Link className="logo" to="/">
    {/* <span className="logo__pic"></span> */}
    <img src={logoImg} alt="DogFood" />
    <span className="logo__text">DogFood</span>
  </Link>
);

export default Logo;
