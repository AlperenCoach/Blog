import './n8n.css';

export default function N8nAutomation() {
  return (
    <section className="n8nPage">
      <div className="n8nHero">
        <div className="n8nHeroText">
          <p className="n8nTag">Automation · Low-code</p>
          <h1>End-to-end workflow automation with n8n</h1>
          <p>
            I gathered everything I’ve learned about using n8n to connect SaaS services, build webhook triggers, and design data-enrichment steps in a visual interface. The guide also covers version control and secrets management so you can prototype quickly without writing code.
          </p>
          <ul>
            <li>Keep CRM and support tools in sync with real-time triggers</li>
            <li>Orchestrate REST/GraphQL layers through HTTP nodes</li>
            <li>Automate popular integrations such as OpenAI, Slack, and Notion</li>
          </ul>
        </div>
        <div className="n8nHeroImage">
          <img
            src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=800&fit=crop"
            alt="Workflow automated with n8n"
            loading="lazy"
          />
        </div>
      </div>

      <div className="n8nContentGrid">
        <article className="n8nCard">
          <h2>Model your flow</h2>
          <p>
            Drag and connect nodes in n8n to build complex logic. Split In Batches helps me process high-volume datasets without hitting API throttling limits.
          </p>
          <img
            src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=900&h=600&fit=crop"
            alt="Workflow design screen"
            loading="lazy"
          />
        </article>

        <article className="n8nCard">
          <h2>Versioning and security</h2>
          <p>
            Every flow is stored as JSON, so it can live inside a Git repo. API keys stay encrypted with the n8n Credentials module, enabling safe collaboration without sharing secrets.
          </p>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop"
            alt="API integration panel"
            loading="lazy"
          />
        </article>
      </div>

      <div className="n8nCTA">
        <h3>Explore the demo flow</h3>
        <p>
          The sample flow records form submissions to Airtable and posts a summary to Slack. Import the file and adapt it to your own stack in minutes.
        </p>
        <a
          href="https://n8n.io/workflows"
          target="_blank"
          rel="noopener noreferrer"
          className="n8nCTAButton"
        >
          Browse the n8n workflow gallery
        </a>
      </div>
    </section>
  );
}

