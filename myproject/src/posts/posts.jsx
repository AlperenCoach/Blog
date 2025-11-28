import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import { FaTh, FaList } from 'react-icons/fa';
import './posts.css';

const n8nBlog = {
  id: 'n8n-automation-guide',
  title: 'Building end-to-end automation with n8n',
  content: `
    <p>A walkthrough on how I use the open-source n8n platform to build SaaS integrations, webhook-based triggers, and data-enrichment flows from scratch.</p>
    
    <h2>Introduction to n8n</h2>
    <p>n8n is an open-source workflow automation tool that allows you to connect different services and automate tasks without writing code. It provides a visual interface where you can drag and drop nodes to create complex workflows that integrate with hundreds of services including CRM systems, databases, APIs, and cloud services.</p>
    
    <h2>Getting Started</h2>
    <p>Setting up n8n is straightforward. You can run it locally using Docker, deploy it on your own server, or use n8n Cloud. Once installed, you'll have access to a powerful visual workflow editor that lets you connect different services through a node-based interface.</p>
    
    <h2>Building Your First Workflow</h2>
    <p>Start by identifying the repetitive tasks in your workflow. For example, you might want to automatically create a record in your CRM when a new lead fills out a form on your website. With n8n, you can set up a webhook trigger that receives form submissions and then processes the data through multiple steps before creating the CRM record.</p>
    
    <h2>Key Features</h2>
    <ul>
      <li><strong>Webhook Triggers:</strong> Receive data from external services in real-time</li>
      <li><strong>HTTP Nodes:</strong> Make REST and GraphQL API calls to any service</li>
      <li><strong>Data Transformation:</strong> Use built-in functions to manipulate and format data</li>
      <li><strong>Error Handling:</strong> Set up retry logic and error notifications</li>
      <li><strong>Version Control:</strong> Export workflows as JSON and store them in Git</li>
    </ul>
    
    <h2>Advanced Patterns</h2>
    <p>As you become more comfortable with n8n, you can implement advanced patterns like:</p>
    <ul>
      <li>Batch processing large datasets using the Split In Batches node</li>
      <li>Implementing conditional logic with IF nodes</li>
      <li>Creating reusable sub-workflows</li>
      <li>Setting up scheduled workflows for periodic tasks</li>
    </ul>
    
    <h2>Best Practices</h2>
    <p>When building workflows in n8n, keep these best practices in mind:</p>
    <ul>
      <li>Always use the Credentials module for storing API keys and secrets</li>
      <li>Add error handling nodes to catch and log failures</li>
      <li>Test workflows with sample data before going live</li>
      <li>Document your workflows with clear node names and descriptions</li>
      <li>Version control your workflows by exporting them regularly</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>n8n provides a powerful way to automate workflows without writing code. Whether you're syncing data between services, processing webhooks, or building complex integrations, n8n's visual interface makes it accessible to both technical and non-technical team members. Start with simple workflows and gradually build more complex automations as you become familiar with the platform.</p>
  `,
  createdAt: '2024-06-05T10:00:00Z',
  author: 'Alperen Coach',
  category: 'Automation',
  imageUrl: 'https://images.ft.com/v3/image/raw/ftcms%3A20523795-74c3-431b-b744-d515fc74c336?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1',
};

const fallbackBlogs = [
  n8nBlog,
  {
    id: 'fallback-react-19',
    title: 'React 19 features and upgrade guide',
    content: `
      <p>A step-by-step look at the new capabilities in React 19 and how to upgrade existing projects safely.</p>
      
      <h2>What's New in React 19</h2>
      <p>React 19 introduces several groundbreaking features that improve both developer experience and application performance. The new compiler optimizations reduce the need for manual memoization, while enhanced server components make it easier to build full-stack React applications.</p>
      
      <h2>Key Features</h2>
      <h3>1. React Compiler</h3>
      <p>The new React Compiler automatically optimizes your components, reducing the need for useMemo, useCallback, and React.memo. It analyzes your code and applies optimizations at compile time, resulting in better performance with less boilerplate.</p>
      
      <h3>2. Enhanced Server Components</h3>
      <p>Server Components have been improved with better data fetching capabilities and more intuitive APIs. You can now seamlessly mix server and client components, making it easier to build performant full-stack applications.</p>
      
      <h3>3. use() Hook</h3>
      <p>The new use() hook allows you to read the value of a Promise or context. This simplifies async data fetching and makes it easier to work with promises in your components without needing useEffect or useState.</p>
      
      <h3>4. Form Actions</h3>
      <p>React 19 introduces built-in support for form actions, making it easier to handle form submissions. The new useFormStatus hook provides form state information, and you can use async functions directly as form actions.</p>
      
      <h3>5. Document Metadata</h3>
      <p>You can now set document metadata (like title and meta tags) directly from your components using the new &lt;title&gt; and &lt;meta&gt; components.</p>
      
      <h2>Upgrade Guide</h2>
      <h3>Step 1: Update Dependencies</h3>
      <p>Start by updating React and React DOM to version 19. Make sure all your dependencies are compatible with React 19. Some libraries may need updates to work with the new version.</p>
      
      <h3>Step 2: Review Breaking Changes</h3>
      <p>React 19 includes some breaking changes. Review the migration guide and update your code accordingly. Pay special attention to:</p>
      <ul>
        <li>Changes in ref handling</li>
        <li>Updates to context API</li>
        <li>Changes in error boundary behavior</li>
      </ul>
      
      <h3>Step 3: Test Thoroughly</h3>
      <p>After upgrading, thoroughly test your application. Pay special attention to:</p>
      <ul>
        <li>Component rendering and re-rendering behavior</li>
        <li>Form submissions and validation</li>
        <li>Error boundaries and error handling</li>
        <li>Server component functionality</li>
      </ul>
      
      <h3>Step 4: Adopt New Features Gradually</h3>
      <p>You don't need to adopt all new features immediately. Start by enabling the React Compiler, then gradually adopt other features like the use() hook and form actions as you refactor your code.</p>
      
      <h2>Performance Improvements</h2>
      <p>React 19 includes significant performance improvements:</p>
      <ul>
        <li>Smaller bundle sizes due to compiler optimizations</li>
        <li>Faster rendering with improved reconciliation</li>
        <li>Better memory usage with optimized hooks</li>
        <li>Improved hydration performance for server-rendered apps</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>React 19 brings powerful new features that make building React applications easier and more performant. While the upgrade requires some effort, the benefits in terms of developer experience and performance make it worthwhile. Take your time with the migration, test thoroughly, and adopt new features gradually.</p>
    `,
    createdAt: '2024-05-01T09:00:00Z',
    author: 'Alperen Coach',
    category: 'React',
    imageUrl: 'https://www.syncfusion.com/blogs/wp-content/uploads/2024/07/Whats-New-in-React-19-1.jpg',
  },
  {
    id: 'fallback-clean-architecture',
    title: 'Applying clean architecture with .NET 8',
    content: `
      <p>How I simplified clean architecture layers using .NET 8 minimal API capabilities.</p>
      
      <h2>Understanding Clean Architecture</h2>
      <p>Clean Architecture is a software design philosophy that emphasizes separation of concerns and independence of frameworks. The architecture is divided into layers, each with specific responsibilities and dependencies that point inward toward the domain layer.</p>
      
      <h2>Layers in Clean Architecture</h2>
      <h3>1. Domain Layer (Core)</h3>
      <p>The innermost layer containing business entities and domain logic. This layer has no dependencies on other layers and represents the core business rules of your application.</p>
      
      <h3>2. Application Layer</h3>
      <p>Contains use cases and application-specific business logic. This layer orchestrates the domain objects to perform specific application tasks. It defines interfaces that the infrastructure layer will implement.</p>
      
      <h3>3. Infrastructure Layer</h3>
      <p>Implements the interfaces defined in the application layer. This includes data access, external service integrations, file system operations, and other technical concerns.</p>
      
      <h3>4. Presentation Layer</h3>
      <p>The outermost layer that handles user interaction. In .NET 8, this can be implemented using Minimal APIs, MVC controllers, or Blazor components.</p>
      
      <h2>.NET 8 Minimal APIs and Clean Architecture</h2>
      <p>.NET 8's Minimal APIs provide a lightweight way to build HTTP APIs with less boilerplate. When combined with Clean Architecture, you can create maintainable and testable applications with clear separation of concerns.</p>
      
      <h3>Benefits of Minimal APIs</h3>
      <ul>
        <li>Reduced boilerplate code</li>
        <li>Better performance with fewer abstractions</li>
        <li>Simpler endpoint definitions</li>
        <li>Easy integration with dependency injection</li>
      </ul>
      
      <h2>Implementation Strategy</h2>
      <h3>1. Project Structure</h3>
      <p>Organize your solution into separate projects for each layer:</p>
      <ul>
        <li><strong>Domain:</strong> Entities, value objects, domain services</li>
        <li><strong>Application:</strong> Use cases, DTOs, interfaces</li>
        <li><strong>Infrastructure:</strong> Data access, external services</li>
        <li><strong>API:</strong> Minimal API endpoints, middleware</li>
      </ul>
      
      <h3>2. Dependency Injection</h3>
      <p>Use .NET 8's built-in dependency injection to wire up your layers. Register services in the API project's Program.cs, keeping the dependency flow pointing inward.</p>
      
      <h3>3. Mapping and Validation</h3>
      <p>Use libraries like AutoMapper or Mapster for DTO mapping, and FluentValidation for input validation. Keep mapping logic in the application layer to maintain separation of concerns.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Keep business logic in the domain and application layers</li>
        <li>Use interfaces to define contracts between layers</li>
        <li>Implement repository pattern for data access</li>
        <li>Use CQRS pattern for complex applications</li>
        <li>Keep controllers/endpoints thin - they should only coordinate</li>
        <li>Write unit tests for each layer independently</li>
      </ul>
      
      <h2>Example: Minimal API Endpoint</h2>
      <p>Here's how a Minimal API endpoint might look in a Clean Architecture setup:</p>
      <pre><code>app.MapPost("/api/users", async (CreateUserRequest request, ICreateUserUseCase useCase) => {
  var result = await useCase.ExecuteAsync(request);
  return Results.Ok(result);
});</code></pre>
      
      <h2>Conclusion</h2>
      <p>Combining Clean Architecture with .NET 8 Minimal APIs gives you a powerful, maintainable, and testable foundation for building applications. The reduced boilerplate of Minimal APIs complements the clear structure of Clean Architecture, making it easier to build and maintain complex applications.</p>
    `,
    createdAt: '2024-04-21T12:30:00Z',
    author: 'Alperen Coach',
    category: '.NET',
    imageUrl: 'https://dinahosting.com/blog/upload/2023/11/net-8.jpg',
  },
  {
    id: 'fallback-ux-research-1',
    title: 'Rapid UX research for product teams',
    content: `
      <p>Field notes for running user research without slowing the sprint cadence.</p>
      
      <h2>The Challenge</h2>
      <p>Product teams often struggle to balance thorough user research with agile development cycles. Traditional research methods can take weeks, but product decisions need to be made quickly. Rapid UX research provides a framework for gathering user insights without disrupting your sprint cadence.</p>
      
      <h2>What is Rapid UX Research?</h2>
      <p>Rapid UX research is a lightweight approach to user research that focuses on speed and actionable insights. It's designed to fit into agile workflows, providing quick feedback loops that inform product decisions without requiring extensive planning or resources.</p>
      
      <h2>Key Principles</h2>
      <ul>
        <li><strong>Speed over perfection:</strong> Get insights quickly, even if they're not comprehensive</li>
        <li><strong>Continuous discovery:</strong> Make research a regular part of your process, not a special event</li>
        <li><strong>Actionable insights:</strong> Focus on findings that directly inform product decisions</li>
        <li><strong>Lightweight methods:</strong> Use tools and techniques that don't require extensive setup</li>
      </ul>
      
      <h2>Rapid Research Methods</h2>
      <h3>1. 15-Minute User Interviews</h3>
      <p>Conduct short, focused interviews with 3-5 users. Prepare 3-4 key questions and keep the conversation focused. These quick sessions can reveal critical insights without requiring extensive scheduling or preparation.</p>
      
      <h3>2. Unmoderated Testing</h3>
      <p>Use tools like UserTesting or Maze to run unmoderated usability tests. Set up tasks, send links to participants, and review results asynchronously. This allows you to gather feedback without coordinating schedules.</p>
      
      <h3>3. Continuous Discovery</h3>
      <p>Integrate research into your regular workflow. Talk to users during support calls, gather feedback from in-app surveys, and review analytics data regularly. Small, continuous insights add up to significant understanding over time.</p>
      
      <h3>4. Remote Research</h3>
      <p>Leverage video calls and screen sharing to conduct remote research sessions. This eliminates travel time and makes it easier to schedule sessions with users in different locations.</p>
      
      <h2>Integrating Research into Sprints</h2>
      <h3>Planning Phase</h3>
      <p>During sprint planning, identify research questions that need answers. Allocate 2-4 hours per sprint for research activities. This might include user interviews, usability testing, or reviewing analytics.</p>
      
      <h3>During Development</h3>
      <p>As features are being built, conduct quick validation tests. Share prototypes with users and gather feedback before finalizing implementation. This prevents building features that don't meet user needs.</p>
      
      <h3>Sprint Review</h3>
      <p>Share research findings during sprint reviews. Present insights in a format that's easy for the team to understand and act upon. Use visual summaries and direct quotes to make findings tangible.</p>
      
      <h2>Tools and Techniques</h2>
      <ul>
        <li><strong>Prototyping tools:</strong> Figma, Framer, or even simple clickable mockups</li>
        <li><strong>Testing platforms:</strong> UserTesting, Maze, or Lookback for remote sessions</li>
        <li><strong>Analytics:</strong> Google Analytics, Hotjar, or Mixpanel for behavioral insights</li>
        <li><strong>Survey tools:</strong> Typeform, Google Forms, or in-app survey widgets</li>
        <li><strong>Research repositories:</strong> Notion, Airtable, or Dovetail for storing findings</li>
      </ul>
      
      <h2>Building a Research Culture</h2>
      <p>For rapid research to be effective, it needs to be part of your team culture:</p>
      <ul>
        <li>Make research accessible - everyone should be able to participate</li>
        <li>Share findings widely - use Slack channels, team meetings, and documentation</li>
        <li>Celebrate insights - recognize when research leads to better product decisions</li>
        <li>Learn from failures - use research to understand why features didn't work</li>
      </ul>
      
      <h2>Measuring Impact</h2>
      <p>Track how research influences product decisions:</p>
      <ul>
        <li>Count features that were changed based on research findings</li>
        <li>Measure user satisfaction improvements after research-driven changes</li>
        <li>Track time saved by catching issues early through research</li>
        <li>Document how research prevented costly mistakes</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Rapid UX research doesn't replace comprehensive research, but it ensures that user insights inform product decisions even in fast-paced development environments. By making research a regular, lightweight part of your process, you can build better products without slowing down your team.</p>
    `,
    createdAt: '2024-03-10T07:15:00Z',
    author: 'Alperen Coach',
    category: 'Design',
    imageUrl: 'https://www.guvi.in/blog/cdn-cgi/image/metadata=keep,quality=40/wp-content/uploads/2024/01/rapid_prototyping_in_ui_ux_designing_feature_image.webp',
  },
  
];

export default function Posts({ selectedCategory = 'All' }) {
  const [allBlogs, setAllBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [itemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // Derive category/tag from the blog title/content when missing
  const getCategory = (blog) => {
    if (blog.category) return blog.category;
    
    const titleLower = blog.title?.toLowerCase() || '';
    if (titleLower.includes('react')) return 'React';
    if (titleLower.includes('javascript')) return 'JavaScript';
    if (titleLower.includes('typescript')) return 'TypeScript';
    if (titleLower.includes('net') || titleLower.includes('.net')) return '.NET';
    if (titleLower.includes('mongodb')) return 'MongoDB';
    if (titleLower.includes('design')) return 'Design';
    if (titleLower.includes('automation') || titleLower.includes('n8n')) return 'Automation';
    
    return 'General';
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        const hasN8nBlog = data.some(
          (blog) =>
            blog.id === n8nBlog.id ||
            blog.slug === 'n8n-automation-guide' ||
            blog.title?.toLowerCase().includes('n8n')
        );
        const allBlogsData = hasN8nBlog ? data : [n8nBlog, ...data];
        setAllBlogs(allBlogsData);
        
        // Filter by category if not 'All'
        const filteredBlogs = selectedCategory === 'All' 
          ? allBlogsData 
          : allBlogsData.filter(blog => {
              const blogCategory = getCategory(blog);
              return blogCategory === selectedCategory;
            });
        
        setDisplayedBlogs(filteredBlogs.slice(0, itemsPerPage));
        setCurrentPage(1); // Reset to first page when category changes
      } catch (err) {
        console.error('Error fetching blogs, displaying fallback data:', err);
        setAllBlogs(fallbackBlogs);
        
        // Filter fallback blogs by category
        const filteredFallback = selectedCategory === 'All'
          ? fallbackBlogs
          : fallbackBlogs.filter(blog => {
              const blogCategory = getCategory(blog);
              return blogCategory === selectedCategory;
            });
        
        setDisplayedBlogs(filteredFallback.slice(0, itemsPerPage));
        setCurrentPage(1);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [itemsPerPage, selectedCategory]);

  // Memoize filtered blogs to avoid recalculating on every render
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'All') {
      return allBlogs;
    }
    return allBlogs.filter(blog => {
      const blogCategory = getCategory(blog);
      return blogCategory === selectedCategory;
    });
  }, [allBlogs, selectedCategory]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const itemsToShow = nextPage * itemsPerPage;
    const nextItems = filteredBlogs.slice(0, itemsToShow);
    setDisplayedBlogs(nextItems);
    setCurrentPage(nextPage);
  };

  // Safe guard to check if there are more blogs to display
  const hasMoreBlogs = filteredBlogs.length > 0 && displayedBlogs.length < filteredBlogs.length;

  // Generate a placeholder image if the blog lacks one
  const getImageUrl = (blog) => {
    if (blog.imageUrl) {
      return blog.imageUrl;
    }
    const imageMap = {
      'react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      'javascript': 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
      'typescript': 'https://images.unsplash.com/photo-1516116216624-53e6977beabf?w=800&h=400&fit=crop',
      'net': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      'mongodb': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      'design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      'web': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
      'programming': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    };
    
    const titleLower = blog.title?.toLowerCase() || '';
    for (const [key, url] of Object.entries(imageMap)) {
      if (titleLower.includes(key)) {
        return url;
      }
    }
    
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop';
  };

  if (loading) {
    return (
      <div className="posts">
        <div className="postsLoading">Loading...</div>
      </div>
    );
  }

  if (allBlogs.length === 0) {
    return (
      <div className="posts">
        <div className="postsEmpty">
          <p>No blog posts yet. Be the first to publish!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts">
      <div className="postsHeader">
        <h2 className="postsTitle">Latest posts</h2>
        <div className="postsViewControls">
          <button
            className={`viewButton ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <FaTh />
          </button>
          <button
            className={`viewButton ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <FaList />
          </button>
        </div>
      </div>
      
      <div className={`postsGrid ${viewMode === 'list' ? 'listView' : ''}`}>
        {displayedBlogs.map((blog) => (
          <article key={blog.id} className="postCard">
            <Link to={`/blog/${blog.id}`} className="postCardLink">
              <div className="postCardImageWrapper">
                <img 
                  src={getImageUrl(blog)} 
                  alt={blog.title}
                  className="postCardImage"
                  loading="lazy"
                />
              </div>
              
              <div className="postCardContent">
                <div className="postCardMeta">
                  <time dateTime={blog.createdAt} className="postCardDate">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                
                <h3 className="postCardTitle">{blog.title}</h3>
                
                <div className="postCardAuthor">
                  <div className="postCardAuthorAvatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="rgba(15, 23, 42, 0.1)"/>
                      <circle cx="12" cy="9" r="4" fill="rgba(15, 23, 42, 0.3)"/>
                      <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="rgba(15, 23, 42, 0.3)" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <span className="postCardAuthorName">{blog.author || 'Author'}</span>
                </div>
                
                <div className="postCardCategory">
                  {getCategory(blog)}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {allBlogs.length > displayedBlogs.length && (
        <div className="loadMoreContainer">
          <button className="loadMoreButton" onClick={handleLoadMore}>
            Load More ({allBlogs.length - displayedBlogs.length} posts left)
          </button>
        </div>
      )}
    </div>
  );
}
