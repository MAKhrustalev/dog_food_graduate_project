import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // подключение элементов
/* SPA - Single Page Application - Приложение с одной страницей */

// import testData from "./assents/data.json"; убрали т.к данные берутся с сайта

// Подключаем компоненты
import Modal from "./components/Modal";
import { Header, Footer } from "./components/General"; // index.jsx

// Подключаем странички
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import OldPage from "./pages/Old";
import Profile from "./pages/Profile";
import Product from "./pages/Product";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [token, setToken] = useState(localStorage.getItem("token12"));
  /*
        Есть массив с товарами (основной) [a,b,c] => [b,c] => [a]???
        | |
         U
        Есть массив с товарами фильтруемый [b,c], [a]
    */
  const [baseData, setBaseData] = useState([]);
  const [goods, setGoods] = useState(baseData);

  const [searchResult, setSearchResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // Сохрани в переменную user то значение, что находится внутри useState

  useEffect(() => {
    if (user) {
      setUserId(localStorage.getItem("user12-id"));
      setToken(localStorage.getItem("token12"));
    } else {
      localStorage.removeItem("user12-id");
      localStorage.removeItem("token12");
      setUserId(null);
      setToken(null);
    }
  }, [user]);

  useEffect(() => {
    console.log("token", token);
    if (token) {
      fetch("https://api.react-learning.ru/products", {
        headers: {
          Authorization: `Bearer ${token}`, // взаимодействие клиента и сервера - запрос может формировать только авторизированный пользователь
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBaseData(data.products);
        });
    }
  }, [token]);
  // количество карточек в каталоге ограничено 300, если товаров больше - нужно делать query запросы, которые будут показывать по 50 (например) товаров на странице

  useEffect(() => {
    setGoods(baseData);
  }, [baseData]);
  // Route - маршрутизаторы страниц, подключаются ко всем страницам
  return (
    <>
      <Header
        user={user}
        upd={setUser}
        searchArr={baseData}
        setGoods={setGoods}
        setSearchResult={setSearchResult}
        setModalOpen={setModalOpen}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} setActive={setModalOpen} />}
          />
          <Route
            path="/catalog"
            element={
              <Catalog // передаем параметры в Каталог
                goods={goods}
                setBaseData={setBaseData}
                userId={userId}
              />
            }
          />
          <Route
            path="/old"
            element={<OldPage searchText={searchResult} goods={goods} />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />} // то что принимаем и его значение
          />
          {/*
          :id - параметризованный запрос, где то, что идет после : является различными данными, которые можно вызвать при помощи свойства id
          {id: "...."}

          шаблон: /product/:brand/:year/:id
          /product/samsung/2019/12345
          /product/samsung/2019/78923
          /product/xaomi/2022/93838
          /product/apple/2019/32483

          шаблон: /product/year/:year
          {year: "..."}
          /product/year/2022
          /product/year/2019
          */}
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </main>
      <Footer />
      <Modal
        isActive={modalOpen}
        setIsActive={setModalOpen}
        setUser={setUser}
      />
    </>
  );
};

export default App;
