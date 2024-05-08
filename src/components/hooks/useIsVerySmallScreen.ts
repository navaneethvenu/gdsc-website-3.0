import { useState, useEffect } from 'react';
import { device } from '../breakpoints';

const useIsVerySmallScreen = () => {
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsVerySmallScreen(window.matchMedia(device.sm).matches);
    };

    checkWindowSize(); 

    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return isVerySmallScreen;
};

export default useIsVerySmallScreen;
