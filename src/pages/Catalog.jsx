import { useContext, useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import BsCard from "../components/BsCard";
import Ctx from "../ctx";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

// TODO: Доработать фильтрацию
const Catalog = ({ goods, userId }) => {
  // let pg = usePagination(goods, 9)
  // const [paginate, setPaginate] = useState(pg)
  const { searchResult } = useContext(Ctx);
  const paginate = usePagination(goods, 9);
  // 1, 20
  // useEffect(() => {
  // 	let pg = usePagination(goods, 9)
  // 	setPaginate(pg)
  // }, [goods])
  useEffect(() => {
    paginate.step(1); // если начали искать- нас перенаправит на 1ю страницу каталога
  }, [searchResult]);
  return (
    <Container className="d-block">
      <Row className="g-4">
        {searchResult && (
          <Col xs={12} className="search-result">
            {searchResult}
          </Col>
        )}
        <Col xs={12}>
          <h1 style={{ margin: 0, gridColumnEnd: "span 3" }}>Каталог</h1>
        </Col>
        {/* При использовании рендера через map(например в catalog компоненте), необходимо указывать уникальный key={pro._id}для верхнеуровнего компонента рендера. Если этого не делать или указывать простые значения вроде 1,2,3 и тд, мы начинаем ловить баги. Потому что реакт не понимает какие именно компоненты изменяются.
Опишу кейс, как это воспроизвести: Заходите на страницу каталога, лайкайте первый товар(видим что есть например во второй строчке "калтык", на котором нет лайка), пишем в поиске "калтык", получаем соотвествующий список и неожиданно калтык становится тоже с лайком. */}

        {paginate.pageData().map((pro, i) => (
          // {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}
          <Col key={pro._id} xs={12} sm={6} md={4} lg={3}>
            <BsCard img={pro.pictures} {...pro} user={userId} />
          </Col>
        ))}
        {/* условный рендеринг */}
        {paginate.pageData().length > 0 && (
          <Col
            xs={12}
            className="text-center d-flex justify-content-center flex-column align-items-center overflow-hidden"
          >
            <Pagination hk={paginate} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Catalog;
