// Класс для подключения к api с конструктором token - передающийся при авторизации пользователя
class Api {
  constructor(token) {
    this.path = "https://api.react-learning.ru";
    this.token = token;
  }
  // метод вызова заголовков
  setHeaders(isContentType = false) {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    if (isContentType) {
      headers["Content-Type"] = "application/json";
    }
    /*
     * {
     *   "Authorization": "Bearer ..."
     *   "Content-Type": "application/json"
     * }
     * */
    return headers;
  }
  // CRUD запросы
  // запрос всех продуктов
  getProducts() {
    return fetch(`${this.path}/products`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // запрос конкретного продукта
  getSingleProduct(id) {
    return fetch(`${this.path}/products/${id}`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // изменение конкретного продукта
  updSingleProduct(id, body) {
    return fetch(`${this.path}/products/${id}`, {
      method: "PATCH",
      headers: this.setHeaders(true),
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  // удаление конкретного продукта
  delSingleProduct(id) {
    return fetch(`${this.path}/products/${id}`, {
      method: "DELETE",
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // добавление одного продукта
  addProduct(body) {
    return fetch(`${this.path}/products`, {
      method: "POST",
      headers: this.setHeaders(true),
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  // добавление или снятие лайка
  setLike(id, isLike) {
    return fetch(`${this.path}/products/likes/${id}`, {
      method: isLike ? "PUT" : "DELETE",
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // добавление отзыва на конкретный товар
  setReview(id, body) {
    return fetch(`${this.path}/products/review/${id}`, {
      method: "POST",
      headers: this.setHeaders(true),
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  // удаление отзыва на конкретный товар
  delReview(id, r_id) {
    return fetch(`${this.path}/products/review/${id}/${r_id}`, {
      method: "DELETE",
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // получение отзыва на конкретный товар
  getReview(id) {
    return fetch(`${this.path}/products/review/${id}`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // получение списка пользователей
  getUsers() {
    return fetch(`${this.path}/users`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // получение информации о пользователе
  getSingleUser(id) {
    return fetch(`${this.path}/users/${id}`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // получение информации об админе (авторе) сайта
  getAdmin() {
    return fetch(`${this.path}/users/me`, {
      headers: this.setHeaders(),
    }).then((res) => res.json());
  }
  // изменение информации об админе (авторе) сайта с изменением авотара
  updAdmin(body, changeImg = false) {
    return fetch(`${this.path}/users/me${changeImg ? "/avatar" : ""}`, {
      method: "PATCH",
      headers: this.setHeaders(true),
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  // регистрация пользователя
  register(body) {
    return fetch(`${this.path}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  // авторизация (войти) пользователя
  auth(body) {
    return fetch(`${this.path}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  // забыл пароль пользователь тоже можно реализовать тут, но нужно ждать реального запроса с реальной почты
}

export default Api;
