import { Link } from "react-router-dom"; // связь с линками
import { Journals } from "react-bootstrap-icons"; // импорт иконки bootstrap
import Ads from "../components/Ads/Ads";
import { AdsMini1, AdsMini2 } from "../components/AsdMini/AdsMini";

const Home = ({ user, setActive }) => {
  // Компонент домашней страницы - если есть user, то страница отрисовывается
  // - открывается ссылка на каталог. Если нет пользователя - предупреджение о авторизаци

  return (
    <div className="info">
      <div className="top">
        <h1>
          Крафтовые <br /> лакомства для <br />
          собак
        </h1>
        <h3>
          Всегда свежие лакомства ручной <br />
          работы с доставкой по России и миру
        </h3>
        <button>
          {user && (
            <Link to="/catalog" className="info-link">
              <Journals style={{ marginRight: "10px" }} />
              Каталог
            </Link>
          )}
        </button>
        {/* {user && (
          <Link to="/catalog" className="info-link">
            <Journals style={{ marginRight: "10px" }} />
            Каталог товаров +
          </Link>
        )} */}
      </div>
      <div className="main">
        Main
        <Ads />
        <AdsMini1 />
        <AdsMini2 />
        <Ads />
      </div>
      <div className="bottom">Bottom</div>
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
