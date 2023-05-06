import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Search = ({ data, setGoods, setSearchResult }) => {
  // let text = "ololo"
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [num, setNum] = useState(0);
  // в переменной text находится пустая строка
  const changeValue = (e) => {
    navigate("/catalog"); // использование поиска на любой странице перенаправляет в Каталог
    let val = e.target.value.toLowerCase();
    // console.log(e.target.value);
    setText(val);
    // setNum(num + 1); // num++ => 0 => 0+1
    /*
			При вводе текста в строку поиска, мы сопоставляем эту строку с данными из массива data
			В консоли выведем новый масивв с подходящими названиями
		*/
    // setNum(data.filter(el => el.name.toLowerCase().includes(
    // 	e.target.value.toLowerCase()
    // )).length);
    // setNum(data.filter(el => el.name.toLowerCase().includes(val)).length);
  };
  const changeText = () => {
    console.log("Click");
    setText("Привет!");
  };
  console.log(text);
  useEffect(() => {
    let str = "";
    if (num && text) {
      str = `По запросу ${text} найдено ${num} товаров`;
    } else if (text) {
      str = `По запросу ${text} не найдено ни одного товара`;
    } else {
      str = "";
    }
    setSearchResult(str);
  }, [num, text]);
  useEffect(() => {
    // console.log("ololo");
    let result = data.filter((el) => el.name.toLowerCase().includes(text));
    setGoods(result);
    setNum(result.length);
    console.log(result);
  }, [text]);
  return (
    <>
      <input
        className="search"
        type="search"
        value={text}
        onChange={changeValue}
      />
      {/*<button onClick={changeText}>Тык {num} раз</button>*/}
      {/*{text && <p>По запросу {text} найдено {num} товаров</p>}*/}
    </>
  );
};

export default Search;

/*
	Жизненный цикл
	Mount - монтаж (отрисовка приложения)
	componentWillMount
	componentDidMount

	componentWillUpdate
	componentDidUpdate

	componentWillUnmount
	componentDidUnmount
*/

/*
	Без React:
	1) Создаем html-контент
	2) Взять нужные теги
	3) Повесить на input событие
	4) По событию добавлять в DOM нужный контент
*/
