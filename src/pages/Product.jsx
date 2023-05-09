// Создаем страницйу конкретного продукта
import { useState, useEffect } from "react"; // импортируем хуки - куда сохранять товар
import { useParams, Link } from "react-router-dom"; //  параметризованные товары

const Product = () => {
  const { id } = useParams(); // id из адресной строки браузера
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://api.react-learning.ru/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token12")}`,
      },
    })
      .then((res) => res.json())
      .then((serverData) => {
        console.log(id, serverData);
        setData(serverData);
      });
  }, []); // страница получает данные один раз и перестеат обновляться
  return (
    <>
      <Link to={`/catalog#pro_${id}`}>Назад</Link>
      {data.name ? (
        <>
          <h1>{data.name}</h1>
          <img src={data.pictures} alt={data.name} />
        </>
      ) : (
        <div className="info" style={{ textAlign: "center" }}>
          Товара {id} не существует
          <br />
          или
          <br />
          он еще не загружен
        </div>
      )}
    </>
  );
};

export default Product;
