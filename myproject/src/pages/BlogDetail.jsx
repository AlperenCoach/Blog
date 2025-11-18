import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogById } from '../services/api';
import { FaArrowLeft, FaCalendar, FaUser, FaComment, FaHeart, FaTag } from 'react-icons/fa';
import './BlogDetail.css';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Blog yazısı bulunamadı veya yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const getImageUrl = (blog) => {
    if (blog?.imageUrl) {
      return blog.imageUrl;
    }
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop';
  };

  const getCategory = (blog) => {
    if (blog?.category) return blog.category;
    const titleLower = blog?.title?.toLowerCase() || '';
    if (titleLower.includes('react')) return 'React';
    if (titleLower.includes('javascript')) return 'JavaScript';
    if (titleLower.includes('typescript')) return 'TypeScript';
    if (titleLower.includes('net') || titleLower.includes('.net')) return '.NET';
    if (titleLower.includes('mongodb')) return 'MongoDB';
    if (titleLower.includes('tasarım') || titleLower.includes('design')) return 'Tasarım';
    return 'Genel';
  };

  if (loading) {
    return (
      <div className="blogDetail">
        <div className="blogDetailLoading">Yükleniyor...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blogDetail">
        <div className="blogDetailError">
          <p>{error || 'Blog yazısı bulunamadı.'}</p>
          <Link to="/" className="blogDetailBackButton">
            <FaArrowLeft /> Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="blogDetail">
      <div className="blogDetailContainer">
        <Link to="/" className="blogDetailBackLink">
          <FaArrowLeft /> Tüm Yazılar
        </Link>

        <header className="blogDetailHeader">
          <div className="blogDetailMeta">
            <div className="blogDetailCategory">
              <FaTag /> {getCategory(blog)}
            </div>
            <time className="blogDetailDate" dateTime={blog.createdAt}>
              <FaCalendar /> {new Date(blog.createdAt).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <div className="blogDetailAuthor">
              <FaUser /> {blog.author || 'Yazar'}
            </div>
          </div>
          
          <h1 className="blogDetailTitle">{blog.title}</h1>
          
          {blog.imageUrl && (
            <div className="blogDetailImageWrapper">
              <img 
                src={getImageUrl(blog)} 
                alt={blog.title}
                className="blogDetailImage"
              />
            </div>
          )}
        </header>

        <div className="blogDetailContent">
          <div className="blogDetailBody">
            {blog.content ? (
              <div 
                className="blogDetailText"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <p className="blogDetailText">İçerik bulunamadı.</p>
            )}
          </div>

          <div className="blogDetailFooter">
            <div className="blogDetailStats">
              <span className="blogDetailStat">
                <FaComment /> 0 Yorum
              </span>
              <span className="blogDetailStat">
                <FaHeart /> {Math.floor(Math.random() * 10)} Beğeni
              </span>
            </div>
            
            <div className="blogDetailActions">
              <button 
                className="blogDetailShareButton"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.content?.substring(0, 100),
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link kopyalandı!');
                  }
                }}
              >
                Paylaş
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

