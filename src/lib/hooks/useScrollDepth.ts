'use client';

import { useEffect, useState } from 'react';

/** true, когда пользователь проскроллил указанную долю страницы. */
export function useScrollDepth(fraction = 0.3): boolean {
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= fraction) setIsReached(true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [fraction]);

  return isReached;
}
