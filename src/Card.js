import './Card.css';
import { ReactComponent as Encyclopedia } from './assets/encyclopedia.svg';
import { ReactComponent as Copy } from './assets/copy.svg';
import { format } from 'date-fns';

function Card({ item, imgSrc, darkVibrant }) {
  const date = new Date(`${item.date}T12:00:00`);
  const openEncyclopedia = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="Card" style={{ boxShadow: `0px 0px 12px 2px ${darkVibrant}` }}>
      <main>
        <img className="Card-main-image" src={imgSrc} alt="itemImageAlt" />
        <span className="Card-main-title">{item.item.name['pt-br']}</span>
        <span className="Card-main-quantity">x{item.item.qty}</span>
      </main>
      <footer>
        <Encyclopedia className="hover-grow pointer" onClick={() => openEncyclopedia(item.item.link['pt-br'])} />
        <span className="Card-footer-date">{format(date, 'MMM dd yyyy')}</span>
        <Copy className="hover-grow pointer" />
      </footer>
    </div>
  );
}

export default Card;
