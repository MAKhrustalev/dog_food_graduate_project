import { useState, useContext } from "react";
import { XOctagon } from "react-bootstrap-icons";
import Ctx from "../../ctx";
import "./style.css";
import { userDesc } from "../../App";
import { userDescId } from "../../App";
import { userToken } from "../../App";

const Modal = ({ isActive, setIsActive, setUser }) => {
  const { api } = useContext(Ctx);
  const [isReg, setIsReg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");

  const changeForm = (e) => {
    e.preventDefault();
    setIsReg(!isReg);
    clearForm();
  };
  const clearForm = () => {
    setName("");
    setEmail("");
    setPwd("");
    setPwd2("");
  };
  const handleForm = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: pwd,
    };
    if (isReg) {
      body.name = name;
      body.group = "group-12";
    }

    const data = await (isReg ? api.register(body) : api.auth(body));

    if (isReg) {
      if (data?._id) {
        setIsReg(false);
      }
    } else {
      if (data && data.token) {
        localStorage.setItem(userToken, data.token);
      }
      if (data?.data) {
        localStorage.setItem(userDesc, data.data.name);
        setUser(data.data.name);
        localStorage.setItem(userDescId, data.data._id);
        clearForm();
        setIsActive(false);
      }
    }
  };

  const st = {
    display: isActive ? "flex" : "none",
  };

  return (
    <div className="modal__wrapper" style={st}>
      <div className="modal">
        <button className="modal__close" onClick={(e) => setIsActive(false)}>
          <XOctagon />
        </button>
        <h3>{isReg ? "Регистрация" : "Вход"}</h3>
        <form onSubmit={handleForm}>
          {isReg && (
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Ваш электронный адрес"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Ваш пароль"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          {isReg && (
            <input
              type="password"
              placeholder="Повторите пароль"
              value={pwd2}
              onChange={(e) => setPwd2(e.target.value)}
            />
          )}
          <div className="modal__btns">
            <button type="submit" disabled={isReg && (!pwd || pwd !== pwd2)}>
              {isReg ? "Зарегистрироваться" : "Войти"}
            </button>
            <a className="modal__link" onClick={changeForm}>
              {isReg ? "Войти" : "Зарегистрироваться"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
