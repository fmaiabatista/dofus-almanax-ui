import './Card.css';
import { ReactComponent as Encyclopedia } from './assets/encyclopedia.svg';
import { ReactComponent as Copy } from './assets/copy.svg';
import itemImage from "./assets/65759.w75h75.png";

function Card({ vibrant, darkVibrant }) {
  return (
    <div className="Card" style={{ boxShadow: `0px 0px 12px 2px ${darkVibrant}` }}>
      <main>
        <img className="Card-main-image" src={itemImage} alt="itemImageAlt" />
        <span className="Card-main-title">Rabo de Wolvexugo</span>
        <span className="Card-main-quantity">x2</span>
      </main>
      <footer>
        <Encyclopedia className="hover-grow pointer" />
        <span className="Card-footer-date">2020-01-05</span>
        <Copy className="hover-grow pointer" />
      </footer>
    </div>
  );
}

export default Card;
