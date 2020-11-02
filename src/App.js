import { useState } from 'react';
import './App.css';
import Card from './Card';
import { ReactComponent as Info } from './assets/info.svg';
import itemImage from './assets/65759.w75h75.png';
import logoWebp from './assets/dofus64.webp';
import logoPng from './assets/dofus64.png';
import { usePalette } from 'react-palette';
// import almanax from './data/almanax.json';

function App() {
  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);
  const [isToday, setIsToday] = useState(currentDay === today);
  const toggleToday = () => setIsToday(!isToday);
  const { data: palette } = usePalette(itemImage);
  console.log(setCurrentDay);

  return (
    <div className="App" style={{ background: `linear-gradient(45deg, ${palette.vibrant}, ${palette.vibrant + '00'})` }}>
      <header className="App-header">
        <picture>
          <source width="32px" srcset={logoWebp} type="image/webp" />
          <img width="32px" src={logoPng} alt="emerald dofus" />
        </picture>
        {/* <span>Dofus Almanax UI</span> */}
        <div className="App-header-time">
          <span>{today.toDateString()}</span>
          <Info className="hover-grow" />
        </div>
      </header>
      <main className="App-main">
        <img className="App-main-image" src={itemImage} alt="itemImageAlt" />
        <Card darkVibrant={palette.darkVibrant} />
      </main>
      <footer className="App-footer">
        <svg
          onClick={toggleToday}
          className="hover-grow pointer"
          width="40"
          height="16"
          viewBox="0 0 40 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M18 10.5L40 10.5V5.5L18 5.5L18 0L0 8L18 16V10.5Z" fill={palette.darkVibrant} />
        </svg>
        {isToday && (
          <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.8147e-06 15.6V14.3H2.6V15.6C2.6 19.9017 6.0983 23.4 10.4 23.4C14.7017 23.4 18.2 19.9017 18.2 15.6C18.2 11.2983 14.7017 7.8 10.4 7.8L9.1 7.8V13L2.6 6.5L9.1 0L9.1 5.2L10.4 5.2C16.1343 5.2 20.8 9.8657 20.8 15.6C20.8 21.3343 16.1343 26 10.4 26C4.6657 26 3.8147e-06 21.3343 3.8147e-06 15.6Z"
              fill={palette.darkVibrant}
            />
          </svg>
        )}
        <svg
          onClick={toggleToday}
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
