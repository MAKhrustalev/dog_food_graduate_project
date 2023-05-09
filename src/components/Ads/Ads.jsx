import "./style.css";
import adImg from "../../assets/images/stripses.jpg";
import { Percent } from "react-bootstrap-icons";

const Ads = (props) => {
  return (
    <div className="ad__big__block">
      <div>
        <h1 className="ad__big__slogan">Подарок за первый заказ!</h1>
        <p className="ad__big__text">Наггетсы из говяжьего легкого</p>
      </div>
      <div className="ad__big__picture">
        {/* <p className="ad__big__popust">%</p> */}
        <Percent className="ad__big__popust" title="Подарок" />
        <img className="ad__big__img" src={adImg} alt="" />
      </div>
    </div>
  );
};

export default Ads;
