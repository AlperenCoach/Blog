import '../post/post.css';

const highlightPost = {
  title: 'React & .NET ile Uçtan Uca Tasarım',
  summary:
    'UI’dan API katmanına kadar izlediğim minimal mimariyi ve performans odaklı ipuçlarını bu yazıda toparladım. Tasarım sistemleri kurarken aldığım notların kısa bir özeti.',
  image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
  date: '2025-04-09',
  tags: ['React', '.NET', 'Architecture'],
};

export default function Post() {
  return (
    <section className="post">
      <article className="postCard">
        <img src={highlightPost.image} alt={highlightPost.title} />
        <div className="postMeta">
          <time dateTime={highlightPost.date}>
            {new Date(highlightPost.date).toLocaleDateString('tr-TR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span>Öne Çıkan Yazı</span>
        </div>
        <div className="postContent">
          <h2>{highlightPost.title}</h2>
          <p>{highlightPost.summary}</p>
          <div className="postTags">
            {highlightPost.tags.map((tag) => (
              <span key={tag} className="postTag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}