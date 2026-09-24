import { useCallback, useEffect, useState } from 'react';
import { PAGE_TABS } from '../data/navigation';
import type { AppPage } from '../types/navigation';

const DEFAULT_PAGE: AppPage = 'builder';

function readPageFromHash(): AppPage {
  const slug = window.location.hash.replace(/^#\/?/, '');
  return PAGE_TABS.find((tab) => tab.slug === slug)?.page ?? DEFAULT_PAGE;
}

/** Hash routing keeps every page linkable on static hosting (GitHub Pages) without server rewrites. */
export function useHashRoute() {
  const [activePage, setActivePage] = useState<AppPage>(readPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(readPageFromHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((page: AppPage) => {
    const slug = PAGE_TABS.find((tab) => tab.page === page)?.slug ?? '';
    window.location.hash = `/${slug}`;
  }, []);

  return { activePage, navigate };
}
