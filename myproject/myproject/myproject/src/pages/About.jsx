import './pages.css';

export default function About() {
  return (
    <section className="page">
      <h1>About</h1>
      <section className="about">
        <h2>About me</h2>
        <p>
          Hi, I’m <strong>Alpi</strong>. I build products with <strong>React</strong> and <strong>TypeScript</strong> on the frontend and the <strong>.NET</strong> ecosystem on the backend. Simplicity in design and clean architecture in code are my main principles.
        </p>
        <p>
          This blog is where I document lessons learned, keep personal notes organized, and share actionable insights about the tools and workflows I rely on.
        </p>
        <p>
          My goal is to explain complex topics through simple, practical, and real-world examples. If anything here inspires your work, that’s the best compliment I could receive.
        </p>
      </section>
    </section>
  );
}

