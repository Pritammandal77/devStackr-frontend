import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
};

export default useScrollToTop;