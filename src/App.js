import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import { ReactComponent as Info } from './assets/info.svg';
import logoWebp from './assets/dofus64.webp';
import logoPng from './assets/dofus64.png';
import { usePalette } from 'react-palette';
import format from 'date-fns/format';
import getDayOfYear from 'date-fns/getDayOfYear';
import almanax from './data/almanax.json';
import almanaxImages from './data/almanaxB64.json';

function App() {
  const today = new Date();
  let todaysIndex = getDayOfYear(today) - 1;
  const [currentIndex, setCurrentIndex] = useState(todaysIndex);
  const [currentImageSrc, setCurrentImageSrc] = useState(
    `data:image/jpeg;base64,${almanaxImages.content[currentIndex][almanax.content[currentIndex].date]}`,
  );
  const { data: palette } = usePalette(currentImageSrc);

  const navigate = (step) => {
    if (step === 0) {
      setCurrentIndex(todaysIndex);
    } else {
      setCurrentIndex((currentIndex) => currentIndex + step);
    }
  };

  useEffect(() => {
    setCurrentImageSrc(`data:image/jpeg;base64,${almanaxImages.content[currentIndex][almanax.content[currentIndex].date]}`);
  }, [currentIndex]);

  return (
    <div className="App" style={{ background: `linear-gradient(45deg, ${palette.vibrant}, ${palette.vibrant + '00'})` }}>
      <header className="App-header">
        <div className="App-header-logo">
          <picture>
            <source width="32px" srcSet={logoWebp} type="image/webp" />
            <img width="32px" src={logoPng} alt="emerald dofus" />
          </picture>
          <span>Dofus Almanax UI</span>
          {/* <span>{currentIndex}</span> */}
        </div>
        <div className="App-header-time">
          <span>{format(today, 'MMM dd yyyy')}</span>
          <Info className="hover-grow" />
        </div>
      </header>
      <main className="App-main">
        <img className="App-main-image" src={currentImageSrc} alt={almanax.content[currentIndex].item.name['pt-br']} />
        <Card item={almanax.content[currentIndex]} imgSrc={currentImageSrc} darkVibrant={palette.darkVibrant} />
      </main>
      <footer className="App-footer">
        <svg
          onClick={() => navigate(-1)}
          className="hover-grow pointer"
          width="40"
          height="16"
          viewBox="0 0 40 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M18 10.5L40 10.5V5.5L18 5.5L18 0L0 8L18 16V10.5Z" fill={palette.darkVibrant} />
        </svg>
        {currentIndex !== todaysIndex && (
          <svg onClick={() => navigate(0)} className="hover-grow pointer" width="26" height="33" viewBox="0 0 26 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.8147e-06 19.5V17.875H3.25V19.5C3.25 24.8771 7.62288 29.25 13 29.25C18.3771 29.25 22.75 24.8771 22.75 19.5C22.75 14.1229 18.3771 9.75 13 9.75L11.375 9.75L11.375 16.25L3.25 8.125L11.375 0L11.375 6.5H13C20.1679 6.5 26 12.3321 26 19.5C26 26.6679 20.1679 32.5 13 32.5C5.83213 32.5 3.8147e-06 26.6679 3.8147e-06 19.5Z"
              fill={palette.darkVibrant}
            />
          </svg>
        )}
        <svg
          onClick={() => navigate(1)}
          className="hover-grow pointer"
          width="40"
          height="16"
          viewBox="0 0 40 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M22 5.5H0V10.5H22V16L40 8L22 0V5.5Z" fill={palette.darkVibrant} />
        </svg>
      </footer>
    </div>
  );
}

export default App;
