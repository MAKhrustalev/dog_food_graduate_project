import { useState, useEffect, useContext, createContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Basket2,
  Pencil,
  Plus,
  SuitHeart,
  SuitHeartFill,
  Truck,
  Award,
  CaretLeft,
  CaretRight,
  Star,
  StarFill,
  Trash3,
} from "react-bootstrap-icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import { getEnding, getRate } from "../utilities/utilities";

import Ctx from "../ctx";
// Статичные константы (например tableInfo) выносите за компонент, они при каждом рендере пересоздаются,
//  а старые удаляются из памяти. В целом это ненужные действия. Хороший пример в footer.jsx,
//  в этом файле у вас константа вынесена за компонент.
const tableInfo = [
  {
    name: "wight",
    text: "Вес",
  },
  {
    name: "price",
    text: "Цена, руб",
  },
  {
    name: "discount",
    text: "Попуст, %",
  },
  {
    name: "author",
    text: "Продавец",
  },
  {
    name: "stock",
    text: "Доступно, шт",
  },
];

const Product = ({ discount, likes, price, name, pictures, tags, _id }) => {
  const { id } = useParams();
  const { api, setBaseData, userId, basket, setBasket } = useContext(Ctx);
  const [data, setData] = useState({});
  const [revText, setRevText] = useState("");
  const [revRating, setRevRating] = useState(0);
  const [hideForm, setHideForm] = useState(true);
  const navigate = useNavigate();

  const [hideReview, setHideReview] = useState(true);
  const [isLike, setIsLike] = useState(likes?.includes(userId));
  const [likeFlag, setLikeFlag] = useState(false);
  // Добавление лайков
  const likeHandler = (id) => {
    setIsLike(!isLike);
    setLikeFlag(true);
  };
  useEffect(() => {
    if (likeFlag) {
      api.setLike(id, isLike).then((data) => {
        setLikeFlag(false);

        api.getProducts().then((newData) => {
          setBaseData(newData.products);
        });
      });
    }
  }, [isLike, id, api, likeFlag, setBaseData]); // deps '_id', 'api', 'likeFlag', 'setBaseData' добавил, тк прога ругалась

  // Добавление звездочек рейтинга (списал)
  let rate = getRate(data);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    i < rate
      ? stars.push(<StarFill key={`${StarFill}` + i} />)
      : stars.push(<Star key={`${Star}` + i} />);
  }

  const addReview = (e) => {
    e.preventDefault();
    api
      .setReview(data._id, {
        text: revText,
        rating: revRating,
      })
      .then((d) => {
        setData(d);
        setRevText("");
        setRevRating(0);
        setHideForm(true);
      });
  };

  const delReview = (id) => {
    api.delReview(data._id, id).then((d) => {
      setData(d);
    });
  };
  // Из за этой же ошибки у вас isLike стейт определяется не правильно. Нужно обновить стейт, как получите продукт.
  useEffect(() => {
    api.getSingleProduct(id).then((serverData) => {
      setData(serverData);
      setIsLike(serverData.likes?.includes(userId));
    });
  }, []);
  // обработчик нажатия на кнопку удаления товара
  const delHandler = () => {
    api.delSingleProduct(id).then((data) => {
      setBaseData((prev) => prev.filter((el) => el._id !== id));
      navigate("/catalog");
    });
  };
  // обработчик нажатия на кнопку изменения товара !!!!!!!!!!!!!!!
  const updHandler = () => {
    api.updSingleProduct(id).then((data) => {
      navigate(`/upd/product/${data._id}`);
    });
  };

  // Добавить в корзину
  const [cnt, setCnt] = useState(0);
  const inBasket = basket.filter((el) => id === el.id).length > 0; // Переменная inBasket такая же ошибка. Используете _id(из пропсов), но такой переменной нет. Берем просто id из params или data._id
  // Функция addToBasket. Используя setBasket вы кладете в стейт некорректные данные. Поэтому у вас они не бьются потом с каталогом. Данные для id, price и discount нужно брать из стейта data(вы берете из пропсов, но если посмотреть в App компонент, то увидим что вы туда ничего не пробрасываете).
  const addToBasket = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Нет проверки на то, что товар уже есть в корзине и нужно увеличить его кол-во, как на стр одного товара
    setBasket((prev) => [
      ...prev,
      {
        id: data._id,
        name: data.name,
        price: data.price,
        discount: data.discount,
        cnt: 1,
      },
    ]);
  };

  // Три кнопки изменения кол-ва товара в корзине (учеличить, уменьшить, удалить)
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
  // функция del такая же ошибка. Меняем _id на id или data._id
  const del = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBasket((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <Container style={{ gridTemplateColumns: "1fr" }}>
      <Row className="g-3">
        <Link className="text-black-50" to={`/catalog#pro_${id}`}>
          <CaretLeft /> Назад
        </Link>
        {data.name ? (
          <>
            <Col xs={8}>
              <h3>{data.name}</h3>
              <p className="text-warning">
                {!!data.reviews
                  ? `${data.reviews.length} отзыв${getEnding(
                      data.reviews.length
                    )}`
                  : "Ещё нет отзывов"}
              </p>
              <span className="text-warning">{[...stars]}</span>
            </Col>
            <Col>
              <ButtonGroup md={5} aria-label="Basic example">
                <div>
                  {data.author._id === userId ? (
                    <Button
                      variant="outline-danger"
                      className="fw-bold"
                      onClick={delHandler}
                    >
                      <Basket2 /> Удалить
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                {data.author._id === userId ? (
                  <Button
                    variant="outline-danger"
                    className="fw-bold"
                    onClick={updHandler}
                  >
                    <Pencil /> Изменить
                  </Button>
                ) : (
                  ""
                )}
              </ButtonGroup>
            </Col>
            <Col xs={12} md={6}>
              <img src={data.pictures} alt={data.name} className="w-100" />
            </Col>
            <Col className="d-none d-md-block" md={1}>
              <img
                src={data.pictures}
                alt={data.name}
                className="w-100 shadow p-3 mb-5 bg-white rounded"
              />
            </Col>
            <Col>
              <Col
                xs={12}
                md={12}
                className={`${
                  data.discount
                    ? "text-decoration-line-through fs-5"
                    : "text-secondary fs-1"
                } fw-bold  ms-1 text-black-50`}
              >
                {data.price} ₽
              </Col>
              <Col
                xs={12}
                md={12}
                className={`${
                  data.discount ? "text-danger" : "d-none"
                } fw-bold fs-1 ms-1 me-1 mb-4`}
              >
                {Math.ceil((data.price * (100 - data.discount)) / 100)} ₽
              </Col>
              <Row className=" ms-1 me-1">
                <Col xs={6} className="text-center">
                  {inBasket && (
                    <ButtonGroup
                      md={5}
                      aria-label="Basic example"
                      className="w-75"
                    >
                      <Button
                        variant="warning"
                        disabled={
                          Array.isArray(basket) &&
                          basket.find((basketEl) => basketEl.id === id)?.cnt ===
                            1
                        }
                        onClick={() => dec(id)}
                      >
                        -
                      </Button>
                      <Button variant="light" disabled>
                        {/* Max - Не понял как вы определяете количество для рендеринга. Нужно искать по корзине соответствующий товар и выводить его cnt */}
                        {Array.isArray(basket)
                          ? basket.find((basketEl) => basketEl.id === id)
                              ?.cnt ?? 0
                          : 0}
                      </Button>
                      <Button variant="warning" onClick={() => inc(id)}>
                        +
                      </Button>
                      {/* <Button variant="outline-secondary">-</Button> */}
                      {/* <Button variant="outline-secondary">0</Button>
                    <Button variant="outline-secondary">+</Button> */}
                    </ButtonGroup>
                  )}
                </Col>
                {/* ) */}
                {/* } */}
                <Col xs={6} className="text-center">
                  <Button
                    disabled={inBasket}
                    onClick={addToBasket}
                    variant="warning"
                    // active
                    className="fw-bold rounded-pill pe-4 ps-4 w-100"
                    style={{ cursor: "pointer" }}
                  >
                    {inBasket ? "В корзине" : "Купить"}
                  </Button>
                </Col>
              </Row>

              <Col
                xs={12}
                md={12}
                className="ms-1 me-1 mb-3 mt-3 text-black-50"
              >
                <span style={{ cursor: "pointer" }} onClick={del}>
                  {/* Проверить есть ли товар в корзине */}
                  {inBasket ? <Trash3 /> : ""}{" "}
                  {inBasket ? "Удалить из корзины" : ""}
                </span>
              </Col>

              <Col
                xs={12}
                md={12}
                className="ms-1 me-1 mb-3 mt-3 text-black-50"
              >
                {
                  <span onClick={likeHandler} style={{ cursor: "pointer" }}>
                    {isLike ? <SuitHeartFill /> : <SuitHeart />}{" "}
                    {isLike ? "В избранном" : "В избранное"}
                  </span>
                }
              </Col>
              <Row className="bg-light m-1 rounded-3">
                <Col md={2}>
                  <Truck className="text-black-50 fs-1" />
                </Col>
                <Col md={10}>
                  <p className="fw-bold fs-6">Доставка по всему миру!</p>
                  <p className="fs-6">
                    Доставка курьером -{" "}
                    <span className="fw-bold fs-6">от 399 ₽</span>{" "}
                  </p>
                  <p className="fs-6">
                    Доставка в пункт выдачи -{" "}
                    <span className="fw-bold fs-6">от 199 ₽</span>
                  </p>
                </Col>
              </Row>
              <Row className="bg-light m-1 rounded-3">
                <Col md={2}>
                  <Award className="text-black-50 fs-1 mt-2" />
                </Col>
                <Col md={10}>
                  <p className="fw-bold fs-6">Гарантия качества</p>
                  <p className="fs-6">
                    Если Вам не понравилось качество нашей продукции, мы вернем
                    деньги, либо сделаем все возможное, чтобы удовлетворить ваши
                    нужды.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Col>
                <span>Описание</span>
              </Col>
              <Col>
                <h6>{data.description}</h6>
              </Col>
              <Col>
                <span>Характеристики</span>
              </Col>
              <Table>
                <tbody>
                  {tableInfo.map((el, i) => (
                    <tr key={i}>
                      <th className="fw-normal text-secondary small w-25">
                        {el.text}
                      </th>
                      <td>
                        {el.name === "author" ? (
                          <>
                            Имя: {data[el.name].name}, Адрес:{" "}
                            {data[el.name].email}
                          </>
                        ) : (
                          data[el.name]
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>

            {data.reviews.length > 0 ? (
              <Col xs={12}>
                <span>Отзывы</span>
                {hideForm && (
                  <Col className="pt-3 pb-3" xs={12} md={4}>
                    <Button
                      variant="outline-secondary"
                      className="fs-6 rounded-pill pe-4 ps-4 w-100"
                      onClick={() => setHideForm(false)}
                    >
                      <Plus /> Написать отзыв
                    </Button>
                  </Col>
                )}
                {!hideForm && (
                  <Col xs={12} className="mt-5">
                    <h3>Новый отзыв</h3>
                    <Form onSubmit={addReview}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="rating">Рейтинг (0-5)</Form.Label>
                        <Form.Control
                          type="number"
                          min={1}
                          max={5}
                          step={1}
                          id="rating"
                          value={revRating}
                          onChange={(e) => setRevRating(+e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="text">Комментарий:</Form.Label>
                        <Form.Control
                          as="textarea"
                          type="text"
                          id="text"
                          value={revText}
                          rows={3}
                          onChange={(e) => setRevText(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        type="reset"
                        className="me-2 btn-warning mb-5"
                        onClick={(e) => {
                          e.preventDefault();
                          setRevText("");
                          setRevRating(0);
                          setHideForm(true);
                        }}
                      >
                        Отмена
                      </Button>
                      <Button type="submit" className="btn-warning mb-5">
                        Добавить
                      </Button>
                    </Form>
                  </Col>
                )}
                <Row className="g-3">
                  {data.reviews
                    .map((el) => (
                      <Col xs={12} sm={12} md={12} key={el._id}>
                        <Card className="h-100">
                          <Card.Body>
                            <span className="d-flex w-100 align-items-center mb-2">
                              <span
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  display: "block",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                  backgroundImage: `url(${el.author.avatar})`,
                                  marginRight: "1rem",
                                  borderRadius: "50%",
                                }}
                              />
                              <span>{el.author.name}</span>
                              <span className="ps-3 fw-normal">
                                {Intl.DateTimeFormat("ru-RU", {
                                  dateStyle: "medium",
                                }).format(Date.parse(el.created_at))}
                              </span>
                            </span>
                            <Card.Title>{el.rating}</Card.Title>
                            <Card.Text className="fs-6 text-secondary">
                              {el.text}
                            </Card.Text>
                            {/* Корзина удаления отзывов, добавленных мной */}
                            {el.author._id === userId && (
                              <span className="text-danger position-absolute end-0 bottom-0 pe-3 pb-2">
                                <Basket2 onClick={() => delReview(el._id)} />
                              </span>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                    .slice(0, 4)}
                </Row>
              </Col>
            ) : (
              hideForm && (
                <Col className="pt-3 pb-3" xs={12} md={4}>
                  <Button
                    variant="outline-secondary"
                    className="fs-6 rounded-pill pe-4 ps-4 w-100"
                    onClick={() => setHideForm(false)}
                  >
                    <Plus /> Написать отзыв
                  </Button>
                </Col>
              )
            )}
            {!hideReview && (
              <Row className="g-3">
                {data.reviews
                  .map((el) => (
                    <Col xs={12} sm={12} md={12} key={el._id}>
                      <Card className="h-100">
                        <Card.Body>
                          <span className="d-flex w-100 align-items-center mb-2">
                            <span
                              style={{
                                width: "30px",
                                height: "30px",
                                display: "block",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundImage: `url(${el.author.avatar})`,
                                marginRight: "1rem",
                                borderRadius: "50%",
                              }}
                            />
                            <span>{el.author.name}</span>
                            <span className="ps-3 fw-normal">
                              {Intl.DateTimeFormat("ru-RU", {
                                dateStyle: "medium",
                              }).format(Date.parse(el.created_at))}
                            </span>
                          </span>
                          <Card.Title>{el.rating}</Card.Title>
                          <Card.Text className="fs-6 text-secondary">
                            {el.text}
                          </Card.Text>
                          {/* Корзина удаления отзывов, добавленных мной */}
                          {el.author._id === userId && (
                            <span className="text-danger position-absolute end-0 bottom-0 pe-3 pb-2">
                              <Basket2 onClick={() => delReview(el._id)} />
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                  .slice(5, data.reviews.length)}
              </Row>
            )}
            <Col className="pt-3 pb-3">
              <Button
                variant="outline-secondary"
                className="fs-6 rounded-pill pe-4 ps-4 w-100"
                onClick={() => {
                  setHideReview(false);
                  return false;
                }}
              >
                <span>Все отзывы</span> <CaretRight />
              </Button>
            </Col>
          </>
        ) : (
          <Col xs={12}>
            <div className="info" style={{ textAlign: "center" }}>
              Товара {id} не существует
              <br />
              или
              <br />
              он еще не загружен
            </div>
          </Col>
        )}
      </Row>
    </Container>
    // </Ctx.Provider>
  );
};

export default Product;
