import './Card.css';
import { ReactComponent as Encyclopedia } from './assets/encyclopedia.svg';
import { ReactComponent as Copy } from './assets/copy.svg';
import itemImage from "./assets/65759.w75h75.png";

function Card({ item, darkVibrant }) {
  return (
    <div className="Card" style={{ boxShadow: `0px 0px 12px 2px ${darkVibrant}` }}>
      <main>
        <img className="Card-main-image" src={itemImage} alt="itemImageAlt" />
        <span className="Card-main-title">{item.item.name["pt-br"]}</span>
        <span className="Card-main-quantity">x{item.item.qty}</span>
      </main>
      <footer>
        <Encyclopedia className="hover-grow pointer" />
        <span className="Card-footer-date">{item.date}</span>
        <Copy className="hover-grow pointer" />
      </footer>
    </div>
  );
}

export default Card;
