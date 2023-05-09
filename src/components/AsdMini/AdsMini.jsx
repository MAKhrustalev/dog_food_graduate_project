import "./style.css";
import adMiniImg1 from "../../assets/images/trainset.png";
import adMiniImg2 from "../../assets/images/oil.png";
import adMiniImg3 from "../../assets/images/horns.png";
import adMiniImg4 from "../../assets/images/turkey.png";

const lineOne = [
  "Наборы",
  "Микс масел",
  "Рога северного оленя",
  "Слипы из шеи индейки",
];
const lineTwo = [
  "для дрессировки",
  "пищевая здоровая натуральная добавка",
  "от 10 до 30 кг.",
  "100% натуральное",
];
const lineThree = ["от 840 руб.", "", "", ""];
const adPhoto = [adMiniImg1, adMiniImg2, adMiniImg3, adMiniImg4];
const colorBg = ["darkgoldenrod", "darkturquoise", "limegreen", "indianred"];
const colorElem = ["goldenrod", "aquamarine", "darkseagreen", "coral"];

const AdsMini1 = (props) => {
  return (
    <div className="wrap">
      <div
        className="ad__mini__block"
        style={{ backgroundColor: `${colorBg[0]}` }}
      >
        <div className="ad__mini__text">
          <p className="ad__mini__slogan">
            <span>{lineOne[0]}</span>
            <br />
            {lineTwo[0]}
            <br />
            <span>{lineThree[0]}</span>
          </p>
        </div>
        <div className="ad__mini__picture">
          <img className="ad__mini__img" src={adPhoto[0]} alt="" />
          <div
            className="ad__mini__bg"
            style={{ backgroundColor: `${colorElem[0]}` }}
          ></div>
        </div>
      </div>
      <div
        className="ad__mini__block"
        style={{ backgroundColor: `${colorBg[1]}` }}
      >
        <div className="ad__mini__text">
          <p className="ad__mini__slogan">
            <span>{lineOne[1]}</span>
            <br />
            {lineTwo[1]}
            <br />
            <span>{lineThree[1]}</span>
          </p>
        </div>
        <div className="ad__mini__picture">
          <img className="ad__mini__img" src={adPhoto[1]} alt="" />
          <div
            className="ad__mini__bg"
            style={{ backgroundColor: `${colorElem[1]}` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
const AdsMini2 = (props) => {
  return (
    <div className="wrap">
      <div
        className="ad__mini__block"
        style={{ backgroundColor: `${colorBg[2]}` }}
      >
        <div className="ad__mini__text">
          <p className="ad__mini__slogan">
            <span>{lineOne[2]}</span>
            <br />
            {lineTwo[2]}
            <br />
            <span>{lineThree[2]}</span>
          </p>
        </div>
        <div className="ad__mini__picture">
          <img className="ad__mini__img" src={adPhoto[2]} alt="" />
          <div
            className="ad__mini__bg"
            style={{ backgroundColor: `${colorElem[2]}` }}
          ></div>
        </div>
      </div>
      <div
        className="ad__mini__block"
        style={{ backgroundColor: `${colorBg[3]}` }}
      >
        <div className="ad__mini__text">
          <p className="ad__mini__slogan">
            <span>{lineOne[3]}</span>
            <br />
            {lineTwo[3]}
            <br />
            <span>{lineThree[3]}</span>
          </p>
        </div>
        <div className="ad__mini__picture">
          <img className="ad__mini__img" src={adPhoto[3]} alt="" />
          <div
            className="ad__mini__bg"
            style={{ backgroundColor: `${colorElem[3]}` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export { AdsMini1, AdsMini2 };
