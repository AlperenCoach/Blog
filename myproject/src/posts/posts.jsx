import Post from '../post/post';
import './posts.css';

export default function Posts() {
  return (
    <div className="posts">
      <h1>Posts</h1>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}