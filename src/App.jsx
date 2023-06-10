import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/* SPA - Single Page Application - Приложение с одной страницей */

// import testData from "./assents/data.json";
import Ctx from "./ctx";
import Api from "./Api";

// Подключаем компоненты
import Modal from "./components/Modal";
import { Header, Footer } from "./components/General"; // index.jsx

// Подключаем странички
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import OldPage from "./pages/Old";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Favorites from "./pages/Favorites";
import UpdProduct from "./pages/UpdProduct";
import Basket from "./pages/Basket";

const App = (likes) => {
  const userDesc = "user12"; // создал тут и раздаю в Profile, index. Не понимаю зачем нужен user12
  const userDescId = "user12-id"; // создал тут и раздаю в Profile, index. Не понимаю зачем нужен user12-id
  const userToken = "token12"; // создал тут и раздаю в  index. Не понимаю зачем нужен token12
  const userBasket = "basket12"; // создал тут и раздаю тут. Не понимаю зачем нужен basket12
  // добавление корзины
  let basketStore = localStorage.getItem(userBasket); // локал сторадж userBasket для Корзины
  if (basketStore && basketStore[0] === "[") {
    // lical storage существует и он массив [
    basketStore = JSON.parse(basketStore);
  } else {
    basketStore = [];
  }
  const [basket, setBasket] = useState(basketStore); // получаем локал сторадж
  const [user, setUser] = useState(localStorage.getItem(userDesc));
  const [userId, setUserId] = useState(localStorage.getItem(userDesc));
  const [token, setToken] = useState(localStorage.getItem(userToken));
  const [api, setApi] = useState(new Api(token));
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
  const [inc, setInc] = useState();
  const [dec, setDec] = useState();
  const [del, setDel] = useState();
  const [_id, set_id] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();

  // Сохрани в переменную user то значение, что находится внутри useState

  useEffect(() => {
    if (user) {
      setUserId(localStorage.getItem(userDescId));
      setToken(localStorage.getItem(userToken));
    } else {
      localStorage.removeItem(userDescId);
      localStorage.removeItem(userToken);
      setUserId(null);
      setToken(null);
    }
  }, [user]);
  // добавление корзины
  useEffect(() => {
    localStorage.setItem(userBasket, JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    setApi(new Api(token)); // передаем экземпляр класса token если он есть
    console.log("token", token);
    // if (token) {
    //     fetch("https://api.react-learning.ru/products", {
    //         headers: {
    //             "Authorization": `Bearer ${token}`// взаимодействие клиента и сервера - запрос может формировать только авторизированный пользователь
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setBaseData(data.products);
    //         })
    // }
  }, [token]);
  // количество карточек в каталоге ограничено 300, если товаров больше - нужно делать query запросы, которые будут показывать по 50 (например) товаров на странице
  useEffect(() => {
    if (token) {
      api.getProducts().then((data) => {
        console.log(data);
        setBaseData(data.products);
      });
    } else {
      setBaseData([]); // если неавторизован - список товаров пустой
    }
  }, [api]);
  /*
    useEffect(cb) - срабатывает при любом изменении внутри компонента
    useEffect(cb, []) - срабатывает один раз при создании компонента
    useEffect(cb, [props]) - срабатывает каждый раз, когда изменяется props
    useEffect(cb, [props1, props2, props3]) - срабатывает каждый раз, когда изменяется props1 или props2 или props3
    */

  /*
   * componentDidUpdate
   * */

  useEffect(() => {
    // console.log("000")
    // console.log(baseData.filter(el => el._id === "622c77cc77d63f6e70967d1e")[0].likes);
    // setGoods(baseData)
  }, [baseData]);

  // const inBasket = basket.filter((el) => _id === el.id).length > 0;
  // const addToBasket = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // Нет проверки на то, что товар уже есть в корзине и нужно увеличить его кол-во, как на стр одного товара
  //   setBasket((prev) => [
  //     ...prev,
  //     {
  //       id: _id,
  //       price,
  //       discount,
  //       cnt: 1,
  //     },
  //   ]);
  // };

  // const Ctx = createContext({}); Класс Контекст=Ctx Маленькое приложение, хранящееся внутри нашего файла
  // import {Ctx} from "./App"
  // Route - маршрутизаторы страниц, подключаются ко всем страницам
  // В корзине или нет
  const inBasket = basket.filter((el) => _id === el.id).length > 0;

  return (
    // объявляем контекст в приложении
    /*
     * age = 2
     * value = {
     *   name: "User",
     *   setName: function(){}
     *   age => age: age
     * }
     * */
    // Все страницы внутри Контехта могут обращаться к данным Контекста
    // независимо от уровня вложенности
    // Инициализация Контекста - для передачи значений и функций в другие элементы приложения
    <Ctx.Provider
      value={{
        searchResult,
        setSearchResult,
        setBaseData,
        baseData,
        goods,
        setGoods,
        userId,
        token,
        api,
        basket,
        setBasket,
        inc,
        dec,
        del,
      }}
    >
      {/* <Ctx2.Provider> */}
      {/*Так можно использовать еще один контекст для ограниченного количества компнентов*/}
      <Header
        user={user}
        upd={setUser}
        searchArr={baseData}
        setGoods={setGoods}
        setModalOpen={setModalOpen}
      />
      {/*</Ctx2.Provider>*/}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} setActive={setModalOpen} />}
          />
          <Route
            path="/catalog"
            element={
              <Catalog
                goods={goods} // передаем параметры в Каталог
                userId={userId}
              />
            }
          />
          <Route path="/old" element={<OldPage goods={goods} />} />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route
            path="/favorites"
            element={<Favorites />} // путь к Избранному
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
          <Route path="/product/:id" element={<Product />} />
          <Route path="/add/product" element={<AddProduct />} />
          <Route path="/upd/product/:id" element={<UpdProduct />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </main>
      <Footer />
      <Modal
        isActive={modalOpen}
        setIsActive={setModalOpen}
        setUser={setUser}
      />
    </Ctx.Provider>
  );
};

export default App;

/*
Когда что использовать?
* props <Component color="red"> - СТАТИЧНОН свойство, которое не 
изменяется внутри этого компонента
*
* state - ДИНАМИЧЕСКИ изменяемое свойство
* const [color, setColor] = useState("red") - было красное
* setColor("blue") - перезаписалось на синий
* <Component color={color}> - компонент стал синим
*
* Меняется в зависимости от свойства color
* useEffect(() => { - хук позволяет отслеживать изменения свойства и если св-во изменилось - делает какое-то действие
*   // do something
* }, [color])
*Так плохо
obj - это глобальное хранилище данных (статичных или динамичных для компонентов, которые находятся в зоне видимости этого объекта)
* obj = {
*   color: color
* }
* <Component color={color}>
    <Text color={color}>
        <Char color={color}/>
    </Text>
* </Component>
*
*Так хорошо
* <Component>
    <Text>
        <Char color={obj.color}/>
    </Text>
* </Component>
*
* obj - это глобальное хранилище данных (статичных или динамичных для компонентов, которые находятся в зоне видимости этого объекта)
*
* 1) React.Context - часть библиотеки React быстрая и легкая (лучше чем Redux)
или или
* 2) Redux - внешняя библиотека, устанавливается как и React.Router дополнительно
* <Obj.Provider>
    <Component>
        <Text>
            <Char color={obj.color}/>
        </Text>
    </Component>
* </Obj.Provider>
*
* localStorage - сохранить данные внутри браузера, чтобы в дальнейшем к ним вернуться - чтобы не авторизовываться каждый раз, когда мы делаем изменение в React
* */
