import { useState, useContext, Fragment } from "react";
import {
  Container,
  Table,
  ButtonGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { Trash3, EmojiFrown } from "react-bootstrap-icons";
import Ctx from "../ctx";
import { Link } from "react-router-dom";

const Basket = ({}) => {
  const { basket, setBasket, baseData } = useContext(Ctx);
  const ids = basket.map((b) => b.id);
  const filteredData = baseData.filter((el) => ids.includes(el._id));

  const sum = basket.reduce((acc, el) => acc + el.price * el.cnt, 0);

  const sumDiscount = basket.reduce((acc, el) => {
    return acc + el.price * el.cnt * ((100 - el.discount) / 100);
  }, 0);

  const inc = (id) => {
    setBasket((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          el.cnt++;
        }
        return el;
      })
    );
  };

  const dec = (id) => {
    setBasket((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          el.cnt--;
        }
        return el;
      })
    );
  };

  const del = (id) => {
    setBasket((prev) => prev.filter((el) => el.id !== id));
  };

  const clearBasket = (id) => {
    setBasket((prev) => []);
  };

  return (
    <Container style={{ gridTemplateColumns: "1fr" }}>
      {basket.length > 0 ? (
        <>
          <h1>Корзина</h1>
          <Table>
            <tbody>
              {basket.map((el) => (
                <tr key={el.id}>
                  {filteredData
                    .filter((f) => f.id === el.id)
                    .map((d) => (
                      <Fragment key={d._id}>
                        <td className="align-middle">
                          <img src={d.pictures} alt={d.name} height="38px" />
                        </td>
                        <td className="align-middle">
                          <Link to={`/product/${el.id}`}>{d.name}</Link>
                        </td>
                      </Fragment>
                    ))}
                  <td className="align-middle">
                    <ButtonGroup>
                      <Button
                        variant="warning"
                        disabled={el.cnt === 1}
                        onClick={() => dec(el.id)}
                      >
                        -
                      </Button>
                      <Button variant="light" disabled>
                        {el.cnt}
                      </Button>

                      <Button variant="warning" onClick={() => inc(el.id)}>
                        +
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td className="align-middle">
                    <Trash3
                      onClick={() => del(el.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td className="align-middle">{el.price} ₽</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {el.discount > 0 ? (
                      <>
                        <span className="text-danger">
                          {Math.ceil(
                            el.price * el.cnt * ((100 - el.discount) / 100)
                          )}{" "}
                          ₽
                        </span>
                        <del className="ms-2 small text-secondary d-inline-block">
                          {el.price * el.cnt} ₽
                        </del>
                      </>
                    ) : (
                      <span>{el.price * el.cnt} ₽</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={5} className="text-end text-uppercase">
                  Общая сумма:
                </td>
                <td className="fs-5 fw-bold">
                  {sumDiscount === sum ? (
                    <span>{sum} ₽</span>
                  ) : (
                    <>
                      <span className="text-danger">
                        {Math.ceil(sumDiscount)} ₽
                      </span>

                      <del className="ms-2 small text-secondary d-inline-block">
                        {sum} ₽
                      </del>
                    </>
                  )}
                </td>
                <td colSpan={5} className="text-end text-uppercase">
                  <Button variant="warning" onClick={clearBasket}>
                    Удалить все
                  </Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </>
      ) : (
        <Container style={{ gridTemplateColumns: "1fr" }}>
          <Row>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center text-center"
            >
              <EmojiFrown size={50} color="grey" />
            </Col>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center text-center pt-5"
            >
              <h4>В корзине нет товаров</h4>
            </Col>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center text-center"
            >
              <p className="text-secondary">
                Добавьте товар, нажав кнопку "В корзину" в карточке товара
              </p>
            </Col>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center text-center"
            >
              <Button
                variant="outline-secondary fw-bold rounded-pill"
                className="text-dark"
                onClick={clearBasket}
                as={Link}
                to="/"
              >
                На главную
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Basket;
