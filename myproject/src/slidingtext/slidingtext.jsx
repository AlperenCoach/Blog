import './slidingtext.css';

const texts = [
  'REACT • NEXT.JS • TYPESCRIPT • NODE.JS • MONGODB • .NET •',
  'DOCKER • AWS • GIT • TAILWIND • PRISMA • VITE •',
  'AI/ML • BLOCKCHAIN • CYBERSECURITY • DEVOPS • FULL STACK •',
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
