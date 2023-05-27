//Кастомный хук для пагинации (разделения Каталога на страницы) как useState только свой собственный
// Хук - по сути замыкание
import { useState } from "react";

export default (arr, cnt) => {
  // Текущая страница (список товаров и сколько товаров нужно отобразить на каждой странице)
  const [page, setPage] = useState(1);
  // 21 товар => 5 страниц
  const maxPage = Math.ceil(arr.length / cnt); // округляем
  // Переход к следущей странице
  const next = () => {
    // Следующая страница не должна быть больше макс
    let nextPage = Math.min(page + 1, maxPage);
    setPage(nextPage);
  };
  // Переход к предыдущей странице
  const prev = () => {
    // Предыдущая страница не должна быть меньше 1
    let prevPage = Math.max(page - 1, 1);
    setPage(prevPage);
  };
  const step = (n) => {
    // Переход к конкретной странице
    setPage(n);
  };
  const pageData = () => {
    let start = (page - 1) * cnt;
    let end = start + cnt;
    return arr.slice(start, end);
  };

  return { page, maxPage, next, prev, step, pageData };
};
