// Созданм личный кабинет пользователя
import { useNavigate } from "react-router-dom"; // хук, чтобы переходить на главную страницу при разлогинивании "Выйти из профиля"

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const logOut = () => {
    setUser("");
    localStorage.removeItem("user12");
    navigate("/"); // отправь на главную страницу
  };
  return (
    <>
      <h1>Личный кабинет</h1>
      <p>Привет, {user}!</p>
      <button onClick={logOut}>Выйти из аккаунта</button>
    </>
  );
};
export default Profile;
