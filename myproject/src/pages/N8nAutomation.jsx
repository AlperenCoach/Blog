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
            src="https://images.ft.com/v3/image/raw/ftcms%3A20523795-74c3-431b-b744-d515fc74c336?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1"
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
          <p>
            The visual workflow editor in n8n makes it easy to understand data flow and logic at a glance. Each node represents a specific action or data transformation, and connections between nodes show how data moves through your workflow. This visual approach makes it accessible to both technical and non-technical team members.
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
          <p>
            The JSON format makes it easy to version control your workflows, track changes over time, and collaborate with team members. You can export workflows, review diffs in Git, and roll back to previous versions if needed. The Credentials module ensures that sensitive information like API keys and passwords are encrypted and never exposed in your workflow JSON files.
          </p>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop"
            alt="API integration panel"
            loading="lazy"
          />
        </article>

        <article className="n8nCard">
          <h2>Webhook triggers</h2>
          <p>
            Set up webhook endpoints that receive data from external services in real-time. When a form is submitted, a payment is processed, or an event occurs in another system, your n8n workflow can automatically respond and process the data.
          </p>
          <p>
            Webhooks are perfect for building event-driven automations. You can create public webhooks for external services or use authentication to secure your endpoints. n8n handles the complexity of receiving and parsing webhook payloads, allowing you to focus on the business logic.
          </p>
        </article>

        <article className="n8nCard">
          <h2>Data transformation</h2>
          <p>
            Use built-in functions and expressions to transform data as it flows through your workflow. Extract specific fields, format dates, combine data from multiple sources, and apply conditional logic to route data based on your business rules.
          </p>
          <p>
            n8n provides a powerful expression editor with access to JavaScript functions, making it easy to manipulate data without writing separate scripts. You can also use the Code node to write custom JavaScript or Python code for more complex transformations.
          </p>
        </article>

        <article className="n8nCard">
          <h2>Error handling and retries</h2>
          <p>
            Build robust workflows with built-in error handling. Configure retry logic for failed operations, set up error notifications, and use the Error Trigger node to handle exceptions gracefully.
          </p>
          <p>
            When an API call fails or a node encounters an error, n8n can automatically retry the operation with exponential backoff. You can also set up notifications to alert you when workflows fail, ensuring you're always aware of issues in your automations.
          </p>
        </article>

        <article className="n8nCard">
          <h2>Popular integrations</h2>
          <p>
            n8n supports hundreds of integrations out of the box, including popular services like Slack, Notion, OpenAI, Google Sheets, Airtable, and many more. Each integration comes with pre-configured nodes that make it easy to interact with these services.
          </p>
          <p>
            For services that don't have built-in nodes, you can use the HTTP Request node to interact with any REST or GraphQL API. This flexibility means you can integrate with virtually any service, even if it's not officially supported by n8n.
          </p>
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

