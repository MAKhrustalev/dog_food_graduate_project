import { Link } from "react-router-dom"; // связь с линками
import { Journals } from "react-bootstrap-icons"; // импорт иконки bootstrap

const Home = ({ user, setActive }) => {
  // Компонент домашней страницы - если есть user, то страница отрисовывается
  // - открывается ссылка на каталог. Если нет пользователя - предупреджение о авторизаци
  return (
    <div className="info">
      {user && (
        <Link to="/catalog" className="info-link">
          <Journals style={{ marginRight: "10px" }} />
          Каталог товаров +
        </Link>
      )}
      {!user && (
        <>
          <span className="info-link" onClick={() => setActive(true)}>
            Авторизуйтесь
          </span>
          , чтобы получить доступ к сайту
        </>
      )}
    </div>
  );
};

export default Home;
