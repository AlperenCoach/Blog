import { Routes, Route } from 'react-router-dom';
import Topbar from './topbar/topbar';
import Home from './pages/home/home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Write from './pages/Write';
import SlidingText from './slidingtext/slidingtext';
import Post from './post/post';
import Footer from './footer/footer';
import Login from './pages/login';
import Signup from './pages/signup';



const HomePage = () => (
  <>
    <SlidingText />
    <Home />
    
    <Post />
    <Footer />
  </>
);

function App() {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
