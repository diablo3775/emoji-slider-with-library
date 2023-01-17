import { useState, useEffect, useRef } from 'react';
import 'emoji-slider';
import './App.css'

export default function App() {
  const [label, setLabel] = useState(0);
  const [rangeSliderEmoji, setRangeSliderEmoji] = useState('💔');
  const rangeSliderRef = useRef(null);
  const sliderRef = useRef(null);

  const handleSliderChange = (event) => {
    setLabel(Math.round(event.target.value * 100));
    console.log(event.target.value, label, rangeSliderEmoji);
  };

  useEffect(() => {
    if (label < 25) {
      setRangeSliderEmoji('💔');
    } else if (label < 50) {
      setRangeSliderEmoji('💜');
    } else if (label < 75) {
      setRangeSliderEmoji('💗');
    } else {
      setRangeSliderEmoji('💖');
    }
  }, [label]);

  useEffect(() => {
    rangeSliderRef.current.innerHTML = rangeSliderEmoji;
  }, [rangeSliderEmoji]);

  useEffect(() => {
    if(sliderRef.current){
        sliderRef.current.addEventListener('change', handleSliderChange);
        return () => {
            sliderRef.current.removeEventListener('change', handleSliderChange);
        };
    }
  }, [sliderRef]);

  return (
    <div className='app'>
      <label>{label}</label>
      <emoji-slider
        ref={sliderRef}
        emoji={rangeSliderEmoji}
        value={label}
        className="styledSlider"
      />
      <label ref={rangeSliderRef}>{rangeSliderEmoji}</label>
    </div>
  );
}