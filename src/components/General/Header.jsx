import { Link } from "react-router-dom"; // связь с линками
import Logo from "./Logo";
import {
  BalloonHeart,
  Cart4,
  PersonCircle,
  BuildingUp,
  BuildingDown,
} from "react-bootstrap-icons";

import Search from "../Search";
// const Header = (props) => {
//     console.log(props.user)
// }
// const Header = ({user}) => {
//     console.log(user)
// }
const Header = ({
  user,
  upd,
  searchArr,
  setGoods,
  setSearchResult,
  setModalOpen,
}) => {
  const login = () => {
    setModalOpen(true);
    // localStorage.setItem("user12", "Vasya");
    // upd("Vasya");
  };
  const logout = () => {
    localStorage.removeItem("user12");
    upd(null);
  };
  return (
    <header>
      <Logo />
      <div className="search-block">
        <Search
          data={searchArr}
          setGoods={setGoods}
          setSearchResult={setSearchResult}
        />
      </div>
      <nav className="header__menu">
        {user && (
          <>
            <Link to="/">
              <BalloonHeart title="Избранное" />
            </Link>
            <Link to="/">
              <Cart4 title="Корзина" />
            </Link>
            <Link to="/">
              <PersonCircle title="Личный кабинет" />
            </Link>
          </>
        )}
        <span>
          {!user && <BuildingUp title="Войти" onClick={login} />}
          {user && <BuildingDown title="Выйти" onClick={logout} />}
        </span>
      </nav>
    </header>
  );
};

export default Header;
// Чтобы сделать Single Page Application, все тэги <a href=>
// заменить на компонент <Link to=> и импортировать  Link
