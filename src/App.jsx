import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Ctx from "./ctx";
import Api from "./Api";

import Modal from "./components/Modal";
import { Header, Footer } from "./components/General";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import OldPage from "./pages/Old";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Favorites from "./pages/Favorites";
import UpdProduct from "./pages/UpdProduct";
import Basket from "./pages/Basket";

export const userDesc = "user12";
export const userDescId = "user12-id";
export const userToken = "token12";
export const userBasket = "basket12";

const App = () => {
  let basketStore = localStorage.getItem(userBasket);
  if (basketStore && basketStore[0] === "[") {
    basketStore = JSON.parse(basketStore);
  } else {
    basketStore = [];
  }

  const [user, setUser] = useState(localStorage.getItem(userDesc));
  const [userId, setUserId] = useState(localStorage.getItem(userDesc));
  const [token, setToken] = useState(localStorage.getItem(userToken));
  const [api, setApi] = useState(new Api(token));
  const [basket, setBasket] = useState(basketStore);
  const [baseData, setBaseData] = useState([]);
  const [goods, setGoods] = useState(baseData);

  const [searchResult, setSearchResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
  useEffect(() => {
    localStorage.setItem(userBasket, JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    setApi(new Api(token));
  }, [token]);

  useEffect(() => {
    if (token) {
      api.getProducts().then((data) => {
        setBaseData(data.products);
      });
    } else {
      setBaseData([]);
    }
  }, [api]);
  useEffect(() => {}, [baseData]);
  return (
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
      }}
    >
      <Header
        user={user}
        upd={setUser}
        searchArr={baseData}
        setGoods={setGoods}
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
            element={<Catalog goods={goods} userId={userId} />}
          />
          <Route path="/old" element={<OldPage goods={goods} />} />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route path="/favorites" element={<Favorites />} />
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
