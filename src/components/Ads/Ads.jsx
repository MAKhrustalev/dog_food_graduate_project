import "./style.css";
import adImg from "../../assets/images/stripses.jpg";
import { Percent } from "react-bootstrap-icons";

const Ads = (props) => {
  return (
    <div className="ad__big__block">
      <div className="ad__big__left">
        <h2 className="ad__big__slogan">Подарок за первый заказ!</h2>
        <p className="ad__big__text">Наггетсы из говяжьего легкого</p>
      </div>
      <div className="ad__big__picture">
        <Percent className="ad__big__popust" title="Подарок" />
        <img className="ad__big__img" src={adImg} alt="" />
      </div>
    </div>
  );
};

export default Ads;
