import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Loading from './pages/Loading';
import Results from './pages/Results';
import Analysis from './pages/Analysis';
import YouTubeGuide from './pages/YouTubeGuide';
import TikTokGuide from './pages/TikTokGuide';
import BookGuide from './pages/BookGuide';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/results" element={<Results />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/youtube-title-generator" element={<YouTubeGuide />} />
          <Route path="/tiktok-hook-generator" element={<TikTokGuide />} />
          <Route path="/book-chapter-title-ideas" element={<BookGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
