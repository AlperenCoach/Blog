import '../post/post.css';

const highlightPost = {
  title: 'End-to-end design with React & .NET',
  summary:
    'A short summary of the minimal architecture and performance-first tips I follow from UI to API, plus the notes I keep while building design systems.',
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
            {new Date(highlightPost.date).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span>Featured Post</span>
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