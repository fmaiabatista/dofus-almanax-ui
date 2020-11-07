import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

const WHITE = '#FFFFFF';

const blankPalette = {
  darkMuted: WHITE,
  darkVibrant: WHITE,
  lightMuted: WHITE,
  lightVibrant: WHITE,
  muted: WHITE,
  vibrant: WHITE,
};

// https://css-tricks.com/converting-color-spaces-in-javascript/#hex-to-rgb
// function hexToRGBA(h = WHITE, alpha = 1) {
//   let r = 0,
//     g = 0,
//     b = 0;

//   if (h.length === 7) {
//     r = '0x' + h[1] + h[2];
//     g = '0x' + h[3] + h[4];
//     b = '0x' + h[5] + h[6];
//   }

//   return `rgba(${+r}, ${+g}, ${+b}, ${alpha})`;
// }

function HSLToRGB(hsl) {
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = hsl[0],
      s = hsl[1].substr(0,hsl[1].length - 1) / 100,
      l = hsl[2].substr(0,hsl[2].length - 1) / 100;

  // Strip label and convert to degrees (if necessary)
  if (h.indexOf("deg") > -1)
  h = h.substr(0,h.length - 3);
  else if (h.indexOf("rad") > -1)
  h = Math.round(h.substr(0,h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
  h = Math.round(h.substr(0,h.length - 4) * 360);
  // Keep hue fraction of 360 if ending up over
  if (h >= 360)
  h %= 360;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "rgb(" + r + "," + g + "," + b + ")";
}

function hexToHSL(H = WHITE, lightness) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = '0x' + H[1] + H[1];
    g = '0x' + H[2] + H[2];
    b = '0x' + H[3] + H[3];
  } else if (H.length === 7) {
    r = '0x' + H[1] + H[2];
    g = '0x' + H[3] + H[4];
    b = '0x' + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `hsl(${h}, ${s}%, ${lightness || l}%)`;
}

function hexToHSLToRGB(hex, lightness) {
  return HSLToRGB(hexToHSL(hex, lightness));
}

function App() {
  const today = new Date();
  let todaysIndex = getDayOfYear(today) - 1;
  const [currentIndex, setCurrentIndex] = useState(todaysIndex);
  const [previousPalette, setPreviousPalette] = useState(blankPalette);
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
    setPreviousPalette(palette);
    setCurrentImageSrc(`data:image/jpeg;base64,${almanaxImages.content[currentIndex][almanax.content[currentIndex].date]}`);
  }, [currentIndex, palette]);

  return (
    <motion.div
      className="App"
      initial={false}
      animate={{
        background: !palette.vibrant
          ? `linear-gradient(60deg, ${hexToHSLToRGB(previousPalette.vibrant, 40)}, ${hexToHSLToRGB(previousPalette.vibrant, 80)}`
          : `linear-gradient(60deg, ${hexToHSLToRGB(palette.vibrant, 40)}, ${hexToHSLToRGB(palette.vibrant, 80)})`,
      }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <header className="App-header">
        <div className="App-header-logo">
          <picture>
            <source width="32px" srcSet={logoWebp} type="image/webp" />
            <img width="32px" src={logoPng} alt="emerald dofus" />
          </picture>
          <span>Dofus Almanax UI</span>
          {/* {palette.vibrant && <span>{hexToHSL(palette.darkVibrant || previousPalette.darkVibrant)}</span>} */}
        </div>
        <div className="App-header-time">
          <span>{format(today, 'MMM dd yyyy')}</span>
          <Info className="hover-grow" />
        </div>
      </header>
      <main className="App-main">
        <Card item={almanax.content[currentIndex]} imgSrc={currentImageSrc} colorAccent={hexToHSLToRGB(palette.darkVibrant, 30)} />
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
          <path fillRule="evenodd" clipRule="evenodd" d="M18 10.5L40 10.5V5.5L18 5.5L18 0L0 8L18 16V10.5Z" fill={hexToHSL(palette.darkVibrant, 20)} />
        </svg>
        {currentIndex !== todaysIndex && (
          <svg
            onClick={() => navigate(0)}
            className="hover-grow pointer"
            width="26"
            height="33"
            viewBox="0 0 26 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.8147e-06 19.5V17.875H3.25V19.5C3.25 24.8771 7.62288 29.25 13 29.25C18.3771 29.25 22.75 24.8771 22.75 19.5C22.75 14.1229 18.3771 9.75 13 9.75L11.375 9.75L11.375 16.25L3.25 8.125L11.375 0L11.375 6.5H13C20.1679 6.5 26 12.3321 26 19.5C26 26.6679 20.1679 32.5 13 32.5C5.83213 32.5 3.8147e-06 26.6679 3.8147e-06 19.5Z"
              fill={hexToHSL(palette.darkVibrant, 20)}
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
          <path fillRule="evenodd" clipRule="evenodd" d="M22 5.5H0V10.5H22V16L40 8L22 0V5.5Z" fill={hexToHSL(palette.darkVibrant, 20)} />
        </svg>
      </footer>
    </motion.div>
  );
}

export default App;
