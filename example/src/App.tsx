import React, { useEffect, useState } from 'react';
import './App.css';

import { Wheel } from 'react-custom-roulette';

const data = [
  {
    option: 'REACT',
    image: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRieUz2k7lzPe8b_ByhbWgcc7d2HeL8LrcA&usqp=CAU',
      sizeMultiplier: 0.55,
      offsetY: 240,
    },
  },
  {
    option: 'CUSTOM',
    image: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRieUz2k7lzPe8b_ByhbWgcc7d2HeL8LrcA&usqp=CAU',
      sizeMultiplier: 0.55,
      offsetY: 240,
    },
  },
  {
    option: 'ROULETTE',
    style: { textColor: '#f9dd50' },
  },
  {
    option: 'WHEEL',
    image: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRieUz2k7lzPe8b_ByhbWgcc7d2HeL8LrcA&usqp=CAU',
      sizeMultiplier: 0.55,
      offsetY: 240,
    },
  },
  {
    option: 'REACT',
    image: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRieUz2k7lzPe8b_ByhbWgcc7d2HeL8LrcA&usqp=CAU',
      sizeMultiplier: 0.55,
      offsetY: 240,
    },
  },
  {
    option: 'CUSTOM',
    image: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRieUz2k7lzPe8b_ByhbWgcc7d2HeL8LrcA&usqp=CAU',
      sizeMultiplier: 0.55,
      offsetY: 240,
    },
  },
  {
    option: 'ROULETTE',
    style: { textColor: '#70bbe0' },
    image: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRieUz2k7lzPe8b_ByhbWgcc7d2HeL8LrcA&usqp=CAU',
      sizeMultiplier: 0.55,
      offsetY: 240,
    },
  },
  {
    option: 'WHEEL',
    image: {
      uri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRieUz2k7lzPe8b_ByhbWgcc7d2HeL8LrcA&usqp=CAU',
      sizeMultiplier: 0.55,
      offsetY: 240,
    },
  },
];

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50'];
const textColors = ['#0b3351'];
const outerBorderColor = '#eeeeee';
const outerBorderWidth = 10;
const innerBorderColor = '#30261a';
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = '#eeeeee';
const radiusLineWidth = 8;
const fontFamily = 'Nunito';
const fontWeight = 'bold';
const fontSize = 20;
const fontStyle = 'normal';
const textDistance = 60;
const spinDuration = 0.4;

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin && !loading) {
      setLoading(true);

      setTimeout(() => {
        setMustSpin(true);
        setLoading(false);
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
      }, 5000);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontStyle={fontStyle}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          spinDuration={spinDuration}
          startingOptionIndex={2}
          // perpendicularText
          textDistance={textDistance}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          disableInitialAnimation={true}
          pending={loading}
        />
        <button className={'spin-button'} onClick={handleSpinClick}>
          SPIN
        </button>
      </header>
    </div>
  );
};

export default App;
