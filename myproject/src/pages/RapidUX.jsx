import './RapidUX.css';

export default function RapidUX() {
  return (
    <section className="rapidUXPage">
      <div className="rapidUXHero">
        <div className="rapidUXHeroText">
          <p className="rapidUXTag">UX · Research · Design</p>
          <h1>Rapid UX research for product teams</h1>
          <p>
            Practical field notes and methodologies for running effective user research without slowing down your sprint cadence. Learn how to conduct lightweight usability testing and gather qualitative insights through rapid interviews.
          </p>
          <ul>
            <li>15-minute user interviews for quick insights</li>
            <li>Unmoderated testing for asynchronous feedback</li>
            <li>Continuous discovery practices</li>
            <li>Integrate research into agile workflows</li>
          </ul>
        </div>
        <div className="rapidUXHeroImage">
          <img
            src="https://www.guvi.in/blog/cdn-cgi/image/metadata=keep,quality=40/wp-content/uploads/2024/01/rapid_prototyping_in_ui_ux_designing_feature_image.webp"
            alt="Rapid UX research"
            loading="lazy"
          />
        </div>
      </div>

      <div className="rapidUXContentGrid">
        <article className="rapidUXCard">
          <h2>15-Minute Interviews</h2>
          <p>
            Conduct short, focused interviews with 3-5 users. Prepare 3-4 key questions and keep the conversation focused. These quick sessions can reveal critical insights without requiring extensive scheduling or preparation.
          </p>
          <p>
            The key to effective rapid interviews is preparation. Have your questions ready, focus on specific behaviors or pain points, and be ready to dig deeper when interesting insights emerge.
          </p>
        </article>

        <article className="rapidUXCard">
          <h2>Unmoderated Testing</h2>
          <p>
            Use tools like UserTesting or Maze to run unmoderated usability tests. Set up tasks, send links to participants, and review results asynchronously. This allows you to gather feedback without coordinating schedules.
          </p>
          <p>
            Unmoderated testing is perfect for validating design decisions quickly. Participants complete tasks on their own time, and you can review recordings and results when convenient.
          </p>
        </article>

        <article className="rapidUXCard">
          <h2>Continuous Discovery</h2>
          <p>
            Integrate research into your regular workflow. Talk to users during support calls, gather feedback from in-app surveys, and review analytics data regularly. Small, continuous insights add up to significant understanding over time.
          </p>
          <p>
            Make research a habit, not an event. Every interaction with users is an opportunity to learn. Document insights as you go and build a knowledge base that informs future decisions.
          </p>
        </article>

        <article className="rapidUXCard">
          <h2>Remote Research</h2>
          <p>
            Leverage video calls and screen sharing to conduct remote research sessions. This eliminates travel time and makes it easier to schedule sessions with users in different locations.
          </p>
          <p>
            Remote research tools have become sophisticated enough to provide rich insights. Screen sharing, recording capabilities, and collaborative whiteboards make remote sessions as effective as in-person ones.
          </p>
        </article>

        <article className="rapidUXCard">
          <h2>Sprint Integration</h2>
          <p>
            Allocate 2-4 hours per sprint for research activities. During sprint planning, identify research questions that need answers. Share findings during sprint reviews in a format that's easy for the team to understand.
          </p>
          <p>
            Research should inform development, not delay it. By integrating research into your sprint cadence, you ensure that user insights are always part of the decision-making process.
          </p>
        </article>

        <article className="rapidUXCard">
          <h2>Research Tools</h2>
          <p>
            Use prototyping tools like Figma or Framer for quick iterations, testing platforms like UserTesting or Maze for validation, analytics tools for behavioral insights, and research repositories like Notion or Dovetail for storing findings.
          </p>
          <p>
            The right tools make rapid research possible. Choose tools that fit your workflow and make it easy to capture, analyze, and share insights with your team.
          </p>
        </article>
      </div>

      <div className="rapidUXCTA">
        <h3>Build a research culture</h3>
        <p>
          Make research accessible to everyone on your team. Share findings widely and celebrate when research leads to better product decisions.
        </p>
        <a
          href="https://www.nngroup.com/articles/ux-research-cheat-sheet/"
          target="_blank"
          rel="noopener noreferrer"
          className="rapidUXCTAButton"
        >
          Learn UX Research Methods
        </a>
      </div>
    </section>
  );
}

