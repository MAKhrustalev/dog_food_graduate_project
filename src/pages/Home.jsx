import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Journals } from "react-bootstrap-icons";
import Ads from "../components/Ads/Ads";
import {
  AdsSet1,
  AdsSet2,
  AdsSet3,
  AdsSet4,
} from "../components/AdsSet/AdsSet";
import Slider from "../components/Slider";

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
        {!user && (
          <>
            <span className="text-danger" onClick={() => setActive(true)}>
              Авторизуйтесь, чтобы получить доступ к сайту
            </span>
          </>
        )}
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
      </div>
      <Container className="main d-block">
        <Row className="gy-2">
          <Col className="col-12">
            <Ads />
          </Col>
          {user ? (
            <Col className="col-12">
              <h3>Хиты</h3>
              <Slider desktop={3} mobile={2} />
            </Col>
          ) : (
            ""
          )}
          <Col sm={12} md={6}>
            <AdsSet1 />
          </Col>
          <Col sm={12} md={6}>
            <AdsSet2 />
          </Col>
          {user ? (
            <Col className="col-12">
              <h3>Лакомства</h3>
              <Slider desktop={3} mobile={2} />
            </Col>
          ) : (
            ""
          )}

          <Col sm={12} md={6}>
            <AdsSet3 />
          </Col>
          <Col sm={12} md={6}>
            <AdsSet4 />
          </Col>
          <Col className="col-12">
            <Ads />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
