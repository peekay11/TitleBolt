import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
