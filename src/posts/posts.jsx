import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import { FaComment, FaHeart, FaTh, FaList } from 'react-icons/fa';
import './posts.css';

export default function Posts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Bloglar yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Resim URL'si yoksa başlığa göre placeholder resim oluştur
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
      'tasarım': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      'web': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
      'programlama': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    };
    
    const titleLower = blog.title?.toLowerCase() || '';
    for (const [key, url] of Object.entries(imageMap)) {
      if (titleLower.includes(key)) {
        return url;
      }
    }
    
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop';
  };

  // Kategori/tag çıkar (başlıktan veya içerikten)
  const getCategory = (blog) => {
    // Eğer blog'da category varsa onu kullan
    if (blog.category) return blog.category;
    
    // Başlığa göre kategori tahmin et
    const titleLower = blog.title?.toLowerCase() || '';
    if (titleLower.includes('react')) return 'React';
    if (titleLower.includes('javascript')) return 'JavaScript';
    if (titleLower.includes('typescript')) return 'TypeScript';
    if (titleLower.includes('net') || titleLower.includes('.net')) return '.NET';
    if (titleLower.includes('mongodb')) return 'MongoDB';
    if (titleLower.includes('tasarım') || titleLower.includes('design')) return 'Tasarım';
    if (titleLower.includes('web')) return 'Web Development';
    
    return 'Genel';
  };

  if (loading) {
    return (
      <div className="posts">
        <div className="postsLoading">Yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts">
        <div className="postsError">{error}</div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="posts">
        <div className="postsEmpty">
          <p>Henüz blog yazısı yok. İlk yazıyı sen ekle!</p>
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
            aria-label="Grid görünümü"
          >
            <FaTh />
          </button>
          <button
            className={`viewButton ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="Liste görünümü"
          >
            <FaList />
          </button>
        </div>
      </div>
      
      <div className={`postsGrid ${viewMode === 'list' ? 'listView' : ''}`}>
        {blogs.map((blog) => (
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
                  <span className="postCardAuthorName">{blog.author || 'Yazar'}</span>
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
    </div>
  );
}
