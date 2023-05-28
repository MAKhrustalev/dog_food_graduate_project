import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // связь с линками
import { Journals } from "react-bootstrap-icons"; // импорт иконки bootstrap
import Ads from "../components/Ads/Ads";
import {
  AdsSet1,
  AdsSet2,
  AdsSet3,
  AdsSet4,
} from "../components/AdsSet/AdsSet";
import Slider from "../components/Slider";

// Компонент домашней страницы - если есть user, то страница отрисовывается
// - открывается ссылка на каталог. Если нет пользователя - предупреджение о авторизаци

const Home = ({ user, setActive, goods, setBaseData, userId }) => {
  return (
    <div className="info">
      <div className="top">
        <h1>
          Крафтовые <br /> лакомства для <br />
          собак
        </h1>
        <p>
          Всегда свежие лакомства ручной <br />
          работы с доставкой по России и миру
        </p>
        {user ? (
          <button>
            {user && (
              <Link to="/catalog" className="info-link">
                <Journals style={{ marginRight: "10px" }} />
                Каталог
              </Link>
            )}
          </button>
        ) : (
          ""
        )}
        {/* {user && (
          <Link to="/catalog" className="info-link">
            <Journals style={{ marginRight: "10px" }} />
            Каталог товаров +
          </Link>
        )} */}
      </div>
      <Container className="main d-block">
        <Row className="gy-2">
          <Col className="col-12">
            <Ads />
          </Col>
          <Col className="col-12">{user ? <h3>Хиты</h3> : ""}</Col>
          <Slider desktop={3} mobile={2} />
          {/* {goods.slice(0, 4).map((pro, i) => (
            <Col key={i} xs={12} sm={6} md={6} lg={3}>
              <BsCard
                img={pro.pictures}
                {...pro}
                setBaseData={setBaseData}
                user={userId}
              />
            </Col>
          ))} */}
          <Col sm={12} md={6}>
            <AdsSet1 />
          </Col>
          <Col sm={12} md={6}>
            <AdsSet2 />
          </Col>
          <Col className="col-12">{user ? <h3>Лакомства</h3> : ""}</Col>
          <Slider desktop={3} mobile={2} />
          {/* {goods.slice(5, 9).map((pro, i) => (
            <Col key={i} xs={12} sm={6} md={6} lg={3}>
              <BsCard
                img={pro.pictures}
                {...pro}
                setBaseData={setBaseData}
                user={userId}
              />
            </Col>
          ))} */}
          <Col sm={12} md={6}>
            <AdsSet3 />
          </Col>
          <Col sm={12} md={6}>
            <AdsSet4 />
          </Col>
          <Col className="col-12">
            <Ads />
          </Col>

          {/*Сколько карточек в ряд будет в слайдере*/}
        </Row>
      </Container>
      {/* <div className="main">
        Main
        <Ads />
        <Ads />
      </div> */}
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
