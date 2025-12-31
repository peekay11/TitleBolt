import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import EnhancedHome from './pages/EnhancedHome';
import Generator from './pages/Generator';
import Loading from './pages/Loading';
import Results from './pages/Results';
import Preview from './pages/Preview';
import Analysis from './pages/Analysis';
import Compare from './pages/Compare';
import Optimize from './pages/Optimize';
import Export from './pages/Export';
import YouTubeGuide from './pages/YouTubeGuide';
import TikTokGuide from './pages/TikTokGuide';
import BookGuide from './pages/BookGuide';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<EnhancedHome />} />
          <Route path="simple" element={<Home />} />
          <Route path="generator" element={<Generator />} />
          <Route path="loading" element={<Loading />} />
          <Route path="results" element={<Results />} />
          <Route path="preview" element={<Preview />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="compare" element={<Compare />} />
          <Route path="optimize" element={<Optimize />} />
          <Route path="export" element={<Export />} />
          <Route path="youtube-title-generator" element={<YouTubeGuide />} />
          <Route path="tiktok-hook-generator" element={<TikTokGuide />} />
          <Route path="book-chapter-title-ideas" element={<BookGuide />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
