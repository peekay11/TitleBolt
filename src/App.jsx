import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Generator from './pages/Generator';
import YouTubeGuide from './pages/YouTubeGuide';
import TikTokGuide from './pages/TikTokGuide';
import BookGuide from './pages/BookGuide';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="generator" element={<Generator />} />
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
