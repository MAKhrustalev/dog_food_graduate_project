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
      <Routes>
        <Route
          path="/"
          element={<Home user={user} setActive={setModalOpen} />}
        />
        <Route path="/catalog" element={<Catalog goods={goods} />} />
        <Route
          path="/old"
          element={<OldPage searchText={searchResult} goods={goods} />}
        />
      </Routes>
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
