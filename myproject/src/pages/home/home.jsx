import Header from '../../header/header';
import './home.css';
import Posts from '../../posts/posts';
import Sidebar from '../../sidebar/sidebar';

export default function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <Sidebar />
        <Posts />
      </div>
    </>
  );
}