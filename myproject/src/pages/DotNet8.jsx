import './DotNet8.css';

export default function DotNet8() {
  return (
    <section className="dotnet8Page">
      <div className="dotnet8Hero">
        <div className="dotnet8HeroText">
          <p className="dotnet8Tag">.NET · Backend</p>
          <h1>Applying clean architecture with .NET 8</h1>
          <p>
            Discover how to simplify clean architecture layers using .NET 8 minimal API capabilities, improved dependency injection, and performance enhancements to build maintainable and scalable applications.
          </p>
          <ul>
            <li>Layer separation with clear boundaries</li>
            <li>Minimal APIs reduce boilerplate code</li>
            <li>Dependency injection for loose coupling</li>
            <li>Repository pattern for data access</li>
          </ul>
        </div>
        <div className="dotnet8HeroImage">
          <img
            src="https://dinahosting.com/blog/upload/2023/11/net-8.jpg"
            alt=".NET 8 clean architecture"
            loading="lazy"
          />
        </div>
      </div>

      <div className="dotnet8ContentGrid">
        <article className="dotnet8Card">
          <h2>Domain Layer</h2>
          <p>
            The innermost layer containing business entities and domain logic. This layer has no dependencies on other layers and represents the core business rules of your application.
          </p>
          <p>
            Key components include entities with identity, value objects that are immutable, domain services for business logic that spans multiple entities, and domain events that represent important business occurrences.
          </p>
        </article>

        <article className="dotnet8Card">
          <h2>Application Layer</h2>
          <p>
            Contains use cases and application-specific business logic. This layer orchestrates the domain objects to perform specific application tasks and defines interfaces that the infrastructure layer will implement.
          </p>
          <p>
            This layer includes use cases that coordinate domain objects, DTOs for data transfer between layers, interfaces that define contracts, and application events for cross-cutting concerns.
          </p>
        </article>

        <article className="dotnet8Card">
          <h2>Infrastructure Layer</h2>
          <p>
            Implements the interfaces defined in the application layer. This includes data access, external service integrations, file system operations, and other technical concerns.
          </p>
          <p>
            The infrastructure layer contains repository implementations, external service integrations, infrastructure services like logging and email, and persistence configurations for databases.
          </p>
        </article>

        <article className="dotnet8Card">
          <h2>Minimal APIs</h2>
          <p>
            .NET 8's Minimal APIs provide a lightweight way to build HTTP APIs with less boilerplate. When combined with Clean Architecture, you can create maintainable and testable applications with clear separation of concerns.
          </p>
          <p>
            Minimal APIs reduce the ceremony of traditional controllers while maintaining all the power of ASP.NET Core. They integrate seamlessly with dependency injection and make it easy to build RESTful APIs.
          </p>
        </article>

        <article className="dotnet8Card">
          <h2>Dependency Injection</h2>
          <p>
            Use .NET 8's built-in dependency injection to wire up your layers. Register services in the API project's Program.cs, keeping the dependency flow pointing inward toward the domain layer.
          </p>
          <p>
            The dependency injection container in .NET 8 supports various service lifetimes (singleton, scoped, transient) and makes it easy to manage dependencies across your application layers.
          </p>
        </article>

        <article className="dotnet8Card">
          <h2>Repository Pattern</h2>
          <p>
            Implement the repository pattern in the infrastructure layer to abstract data access. This makes your code more testable and allows you to swap out data access implementations easily.
          </p>
          <p>
            Repositories provide a clean interface for data operations, hiding the complexity of the underlying data store. This pattern is essential for maintaining clean architecture principles.
          </p>
        </article>
      </div>

      <div className="dotnet8CTA">
        <h3>Start building with Clean Architecture</h3>
        <p>
          Learn how to structure your .NET 8 applications using Clean Architecture principles for better maintainability and testability.
        </p>
        <a
          href="https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures"
          target="_blank"
          rel="noopener noreferrer"
          className="dotnet8CTAButton"
        >
          Explore .NET Architecture Guides
        </a>
      </div>
    </section>
  );
}

