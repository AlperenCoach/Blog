import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/api';
import './posts.css';

export default function Posts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Resim URL'si yoksa başlığa göre placeholder resim oluştur
  const getImageUrl = (blog) => {
    if (blog.imageUrl) {
      return blog.imageUrl;
    }
    // Başlığa göre temalı placeholder resimler
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
    
    // Varsayılan placeholder
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop';
  };

  return (
    <div className="posts">
      <div className="postsGrid">
        {blogs.map((blog) => (
          <article key={blog.id} className="postCard">
            <div className="postCardImageWrapper">
              <img 
                src={getImageUrl(blog)} 
                alt={blog.title}
                className="postCardImage"
                loading="lazy"
              />
            </div>
            <div className="postCardHeader">
              <time dateTime={blog.createdAt} className="postCardDate">
                {new Date(blog.createdAt).toLocaleDateString('tr-TR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
            <h2 className="postCardTitle">{blog.title}</h2>
            <p className="postCardDescription">
              {blog.content?.substring(0, 150)}...
            </p>
            <Link to={`/blog/${blog.id}`} className="postCardButton">
              Devamını Oku
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
