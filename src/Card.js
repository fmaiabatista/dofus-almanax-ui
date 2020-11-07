import './Card.css';
import { motion } from 'framer-motion';
import { ReactComponent as Encyclopedia } from './assets/encyclopedia.svg';
import { ReactComponent as Copy } from './assets/copy.svg';
import { format } from 'date-fns';

function Card({ item, imgSrc, colorAccent }) {
  const date = new Date(`${item.date}T12:00:00`);
  const openEncyclopedia = (link) => {
    window.open(link, '_blank');
  };

  return (
    <motion.div className="Card" initial={false} animate={{ color: colorAccent }} transition={{ duration: 0.7, ease: 'easeOut' }}>
      <main>
        <img className="Card-main-image" src={imgSrc} alt="itemImageAlt" />
        <span className="Card-main-title">{item.item.name['pt-br'] || `${item.item.name['en-us']} *`}</span>
        <span className="Card-main-quantity">x{item.item.qty}</span>
      </main>
      <footer>
        <Encyclopedia
          className="hover-grow pointer"
          onClick={() => openEncyclopedia(item.item.link['pt-br'] || item.item.link['en-us'] || item.item.link['search'])}
        />
        <span className="Card-footer-date">{format(date, 'MMM dd yyyy')}</span>
        <Copy className="hover-grow pointer" />
      </footer>
    </motion.div>
  );
}

export default Card;
