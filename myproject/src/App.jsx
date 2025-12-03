import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Topbar from './topbar/topbar';
import Home from './pages/home/home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Write from './pages/Write';
import SlidingText from './slidingtext/slidingtext';
import Footer from './components/Footer.jsx';
import Login from './pages/login';
import Signup from './pages/signup';
import N8nAutomation from './pages/N8nAutomation';
import React19 from './pages/React19';
import DotNet8 from './pages/DotNet8';
import RapidUX from './pages/RapidUX';
import ProtectedRoute from './components/ProtectedRoute';
import MyProfile from './pages/myProfile';
import EditProfile from './pages/EditProfile.jsx';
import GetAnOffer from './pages/getAnOffer';

const HomePage = () => (
  <>
    <SlidingText />
    <Home />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Topbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/n8n-automation-guide" element={<N8nAutomation />} />
        <Route path="/blog/fallback-react-19" element={<React19 />} />
        <Route path="/blog/fallback-clean-architecture" element={<DotNet8 />} />
        <Route path="/blog/fallback-ux-research-1" element={<RapidUX />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/write" 
          element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/get-an-offer" element={<GetAnOffer />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;




