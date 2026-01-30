import { useEffect, useMemo, useState } from 'react';

export type TabId =
  | 'dashboard'
  | 'projects'
  | 'parties'
  | 'entitlements'
  | 'payments'
  | 'cheques'
  | 'inventory'
  | 'reports'
  | 'transfer'
  | 'settings'
  | 'about';

export type Tab = {
  id: TabId;
  title: string;
};

const defaultTabs: Tab[] = [{ id: 'dashboard', title: 'Dashboard' }];

const titles: Record<TabId, string> = {
  dashboard: 'Dashboard',
  projects: 'Şantiyeler',
  parties: 'Cariler',
  entitlements: 'Hakediş',
  payments: 'Ödemeler',
  cheques: 'Çek/Senet',
  inventory: 'Stok',
  reports: 'Raporlar',
  transfer: 'Transfer (Excel/CSV)',
  settings: 'Ayarlar',
  about: 'Hakkında'
};

export const useTabs = () => {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const stored = localStorage.getItem('sn.tabs');
    if (stored) {
      return JSON.parse(stored) as Tab[];
    }
    return defaultTabs;
  });
  const [activeId, setActiveId] = useState<TabId>(() => {
    const stored = localStorage.getItem('sn.activeTab');
    if (stored) {
      return stored as TabId;
    }
    return defaultTabs[0].id;
  });

  useEffect(() => {
    localStorage.setItem('sn.tabs', JSON.stringify(tabs));
    localStorage.setItem('sn.activeTab', activeId);
  }, [tabs, activeId]);

  const openTab = (id: TabId) => {
    setTabs((prev) => {
      if (prev.some((tab) => tab.id === id)) {
        return prev;
      }
      return [...prev, { id, title: titles[id] }];
    });
    setActiveId(id);
  };

  const closeTab = (id: TabId) => {
    setTabs((prev) => {
      const next = prev.filter((tab) => tab.id !== id);
      if (activeId === id) {
        const fallback = next[next.length - 1] ?? defaultTabs[0];
        setActiveId(fallback.id);
      }
      return next.length > 0 ? next : defaultTabs;
    });
  };

  const activeTab = useMemo(() => tabs.find((tab) => tab.id === activeId) ?? defaultTabs[0], [tabs, activeId]);

  return {
    tabs,
    activeTab,
    activeId,
    setActiveId,
    openTab,
    closeTab
  };
};
