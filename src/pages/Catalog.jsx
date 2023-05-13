import { Container, Row, Col } from "react-bootstrap";
import BsCard from "../components/BsCard";

// Компонент страницы каталога без react-bootstrap
// const Catalog = ({ goods, setBaseData, userId }) => {
//   console.log(goods);
//   return (
//     <div className="container">
//       <h1 style={{ margin: 0, gridColumnEnd: "span 3" }}>Каталог</h1>
//       {goods.map((pro, i) => (
//         // {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}
//         <BsCard
//           key={i}
//           img={pro.pictures}
//           {...pro} // деструкторизация страницы со всеми свойствами товара
//           setBaseData={setBaseData}
//           user={userId}
//         />
//       ))}
//     </div>
//   );
// };

// Компонент страницы каталога c react-bootstrap
const Catalog = ({ goods, setBaseData, userId, user }) => {
  console.log(goods);
  return (
    <Container className="d-block">
      <Row className="g-4">
        <Col xs={12}>
          <h1 style={{ margin: 0, gridColumnEnd: "span 3" }}>Каталог</h1>
          {/* <h1>{user ? "YES" : "NO"}</h1> */}
        </Col>
        {goods.map((pro, i) => (
          // {name, price, likes, _id} => name={pro.name} price={pro.price} _id={pro._id} likes={pro.likes}
          <Col key={i} xs={12} sm={6} md={4} lg={3}>
            <BsCard
              img={pro.pictures}
              {...pro}
              setBaseData={setBaseData}
              user={userId}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default Catalog;
