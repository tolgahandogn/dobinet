import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import TabsBar from '../components/TabsBar';
import SearchModal from '../components/SearchModal';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useTabs, TabId } from '../store/tabs';
import Login from '../components/Login';
import Dashboard from './Dashboard';
import Projects from './Projects';
import Parties from './Parties';
import Entitlements from './Entitlements';
import Payments from './Payments';
import Cheques from './Cheques';
import Inventory from './Inventory';
import Reports from './Reports';
import Transfer from './Transfer';
import Settings from './Settings';
import About from './About';

const App = () => {
  const { tabs, activeId, activeTab, openTab, closeTab, setActiveId } = useTabs();
  const [searchOpen, setSearchOpen] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState<string | null>(null);
  const [lastShortcut, setLastShortcut] = useState<string>('');

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (event.ctrlKey && key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
        setLastShortcut('Global arama (Ctrl+K)');
      }
      if (event.ctrlKey && key === 'n') {
        event.preventDefault();
        setLastShortcut('Yeni kayıt (Ctrl+N)');
      }
      if (event.ctrlKey && key === 's') {
        event.preventDefault();
        setLastShortcut('Kaydet (Ctrl+S)');
      }
      if (event.ctrlKey && key === 'f') {
        event.preventDefault();
        setLastShortcut('Bul (Ctrl+F)');
      }
      if (event.ctrlKey && key === 'e') {
        event.preventDefault();
        setLastShortcut('Dışa aktar (Ctrl+E)');
      }
      if (key === 'escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const navigate = (id: TabId) => {
    openTab(id);
    setSearchOpen(false);
  };

  const renderActive = () => {
    switch (activeTab.id) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'parties':
        return <Parties />;
      case 'entitlements':
        return <Entitlements />;
      case 'payments':
        return <Payments />;
      case 'cheques':
        return <Cheques />;
      case 'inventory':
        return <Inventory />;
      case 'reports':
        return <Reports />;
      case 'transfer':
        return <Transfer />;
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      {loggedInRole ? (
        <div className="app-shell">
          <TopBar onNavigate={navigate} onSearch={() => setSearchOpen(true)} />
          <div className="app-body">
            <Sidebar onNavigate={navigate} />
            <main className="workspace">
              <TabsBar tabs={tabs} activeId={activeId} onSelect={setActiveId} onClose={closeTab} />
              <div className="workspace-content">{renderActive()}</div>
            </main>
          </div>
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} />
          <div className="status-bar">
            Rol: {loggedInRole}
            {lastShortcut ? ` • Son kısayol: ${lastShortcut}` : ''}
          </div>
        </div>
      ) : (
        <Login onLogin={setLoggedInRole} />
      )}
    </ErrorBoundary>
  );
};

export default App;
