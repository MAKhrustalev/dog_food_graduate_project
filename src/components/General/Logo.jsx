import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";

const Logo = () => (
  <Link className="logo" to="/">
    <img src={logoImg} alt="DogFood" />
    <span className="logo__text">DogFood</span>
  </Link>
);

export default Logo;
