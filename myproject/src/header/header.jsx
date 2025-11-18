import { useEffect, useState } from 'react';
import headerImage from '../assets/headerImage.jpg';
import './header.css';

const sliderTexts = [
  'Alpi\'s Coding Blog',
  'React & .NET Development',
  'Full Stack Solutions',
  'Modern Web Technologies',
];

export default function Header() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY * 0.2;
      const clamped = Math.min(offset, 120);
      setParallaxOffset(clamped);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % sliderTexts.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm headerSliderText">
          {sliderTexts[currentTextIndex]}
        </span>
        <button className="headerButton">Read More</button>
      </div>
      <div className="headerImgWrapper">
        <img
          className="headerImg"
          src={headerImage}
          alt="Person walking along a forest trail"
          style={{ transform: `translateY(${parallaxOffset * -1}px) scale(1.08) skewY(3deg)` }}
        />
      </div>
    </div>
  );
}