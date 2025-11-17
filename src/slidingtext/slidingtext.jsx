import './slidingtext.css';

const texts = [
  'REACT • TYPESCRIPT • NEXT.JS • TAILWIND • PRISMA • TESTING LIBRARY •',
  'CYBERSECURITY • WEB DEVELOPMENT • AI • BLOCKCHAIN • IOT •',
];

export default function SlidingText() {
  return (
    <div className="sliding-container">
      <div className="sliding-track">
        {[...texts, ...texts, ...texts].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
