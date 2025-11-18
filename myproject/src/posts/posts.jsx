import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import { FaComment, FaHeart, FaTh, FaList } from 'react-icons/fa';
import './posts.css';

const n8nBlog = {
  id: 'n8n-automation-guide',
  title: 'Building end-to-end automation with n8n',
  content:
    'A walkthrough on how I use the open-source n8n platform to build SaaS integrations, webhook-based triggers, and data-enrichment flows from scratch.',
  createdAt: '2024-06-05T10:00:00Z',
  author: 'Demo Author',
  category: 'Automation',
  imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=400&fit=crop',
};

const fallbackBlogs = [
  n8nBlog,
  {
    id: 'fallback-react-19',
    title: 'React 19 features and upgrade guide',
    content:
      'A step-by-step look at the new capabilities in React 19 and how to upgrade existing projects safely.',
    createdAt: '2024-05-01T09:00:00Z',
    author: 'Demo Author',
    category: 'React',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
  },
  {
    id: 'fallback-clean-architecture',
    title: 'Applying clean architecture with .NET 8',
    content:
      'How I simplified clean architecture layers using .NET 8 minimal API capabilities.',
    createdAt: '2024-04-21T12:30:00Z',
    author: 'Demo Author',
    category: '.NET',
    imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=400&fit=crop',
  },
  {
    id: 'fallback-ux-research-1',
    title: 'Rapid UX research for product teams',
    content:
      'Field notes for running user research without slowing the sprint cadence.',
    createdAt: '2024-03-10T07:15:00Z',
    author: 'Demo Author',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&h=400&fit=crop',
  },
  {
    id: 'fallback-ux-research-2',
    title: 'Rapid UX research for product teams',
    content:
      'Field notes for running user research without slowing the sprint cadence.',
    createdAt: '2024-03-10T07:15:00Z',
    author: 'Demo Author',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&h=400&fit=crop',
  },
  {
    id: 'fallback-ux-research-3',
    title: 'Rapid UX research for product teams',
    content:
      'Field notes for running user research without slowing the sprint cadence.',
    createdAt: '2024-03-10T07:15:00Z',
    author: 'Demo Author',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&h=400&fit=crop',
  },
  {
    id: 'fallback-ux-research-4',
    title: 'Rapid UX research for product teams',
    content:
      'Field notes for running user research without slowing the sprint cadence.',
    createdAt: '2024-03-10T07:15:00Z',
    author: 'Demo Author',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&h=400&fit=crop',
  },
  {
    id: 'fallback-ux-research-5',
    title: 'Rapid UX research for product teams',
    content:
      'Field notes for running user research without slowing the sprint cadence.',
    createdAt: '2024-03-10T07:15:00Z',
    author: 'Demo Author',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&h=400&fit=crop',
  },
];

export default function Posts() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [itemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

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
        setDisplayedBlogs(allBlogsData.slice(0, itemsPerPage));
      } catch (err) {
        console.error('Error fetching blogs, displaying fallback data:', err);
        setAllBlogs(fallbackBlogs);
        setDisplayedBlogs(fallbackBlogs.slice(0, itemsPerPage));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [itemsPerPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const itemsToShow = nextPage * itemsPerPage;
    const nextItems = allBlogs.slice(0, itemsToShow);
    setDisplayedBlogs(nextItems);
    setCurrentPage(nextPage);
  };

  // Safe guard to check if there are more blogs to display
  const hasMoreBlogs = allBlogs.length > 0 && displayedBlogs.length < allBlogs.length;

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
      'tasarim': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      'design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      'web': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
      'programlama': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
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

  // Derive category/tag from the blog title/content when missing
  const getCategory = (blog) => {
    // Use explicit category if present on the blog
    if (blog.category) return blog.category;
    
    // Otherwise infer the category from title keywords
    const titleLower = blog.title?.toLowerCase() || '';
    if (titleLower.includes('react')) return 'React';
    if (titleLower.includes('javascript')) return 'JavaScript';
    if (titleLower.includes('typescript')) return 'TypeScript';
    if (titleLower.includes('net') || titleLower.includes('.net')) return '.NET';
    if (titleLower.includes('mongodb')) return 'MongoDB';
    if (titleLower.includes('tasarim') || titleLower.includes('design')) return 'Design';
    if (titleLower.includes('web')) return 'Web Development';
    
    return 'General';
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
                  <div className="postCardStats">
                    <span className="postCardStat">
                      <FaComment /> 0
                    </span>
                    <span className="postCardStat">
                      <FaHeart /> {Math.floor(Math.random() * 5)}
                    </span>
                  </div>
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
                
                <p className="postCardDescription">
                  {blog.content?.substring(0, 120)}...
                </p>
                
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
