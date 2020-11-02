import { useState } from 'react';
import './App.css';
import Card from './Card';
import { ReactComponent as Info } from './assets/info.svg';
import itemImage from './assets/65759.w75h75.png';
import { usePalette } from 'react-palette'

function App() {
  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);
  const [isToday, setIsToday] = useState(currentDay === today);
  const toggleToday = () => setIsToday(!isToday);
  const { data } = usePalette(itemImage);

  return (
    <div className="App" style={{ background: `linear-gradient(45deg, ${data.vibrant}, ${data.vibrant + '00'})`}}>
      <header className="App-header">
        <span>Dofus Almanax UI</span>
        <div className="App-header-time">
          <span>{today.toDateString()}</span>
          <Info className="hover-grow" />
        </div>
      </header>
      <main className="App-main">
        <img className="App-main-image" src={itemImage} alt="itemImageAlt" />
        <Card darkVibrant={data.darkVibrant} />
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
          <path fillRule="evenodd" clipRule="evenodd" d="M18 10.5L40 10.5V5.5L18 5.5L18 0L0 8L18 16V10.5Z" fill={data.darkVibrant} />
        </svg>
        {isToday && <span className="App-footer-backToToday" onClick={() => setCurrentDay(new Date())} style={{ color: data.darkVibrant, border: `1px solid ${data.darkVibrant}` }}>Back to Today</span>}
        <svg
          onClick={toggleToday}
          className="hover-grow pointer"
          width="40"
          height="16"
          viewBox="0 0 40 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M22 5.5H0V10.5H22V16L40 8L22 0V5.5Z" fill={data.darkVibrant} />
        </svg>
      </footer>
    </div>
  );
}

export default App;
