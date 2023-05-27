import { Link } from "react-router-dom"; // связь с линками
import Logo from "./Logo";
const links = [
  { name: "Каталог", src: "/catalog" },
  { name: "Избранное", src: "/favorites" },
  { name: "Корзина", src: "/" },
  { name: "Тестовая страница", src: "/old" },
];

const Footer = () => (
  <footer>
    <div className="footer__copy">
      <Logo />
      <span>©{new Date().getFullYear()}</span>
    </div>
    <ul className="footer__nav">
      {links.map((el) => (
        <li key={el.name}>
          <Link to={el.src}>{el.name}</Link>
        </li>
      ))}
    </ul>
  </footer>
);

export default Footer;
// Чтобы сделать Single Page Application, все тэги <a href=>
// заменить на компонент <Link to=> и импортировать  Link
