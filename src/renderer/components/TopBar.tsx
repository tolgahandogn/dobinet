import { TabId } from '../store/tabs';

const megaMenuItems: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Şantiyeler' },
  { id: 'parties', label: 'Cariler' },
  { id: 'entitlements', label: 'Hakediş' },
  { id: 'payments', label: 'Ödemeler' },
  { id: 'cheques', label: 'Çek/Senet' },
  { id: 'inventory', label: 'Stok' },
  { id: 'reports', label: 'Raporlar' },
  { id: 'transfer', label: 'Transfer' }
];

type Props = {
  onNavigate: (id: TabId) => void;
  onSearch: () => void;
};

const TopBar = ({ onNavigate, onSearch }: Props) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="brand">ŞantiyeNets (SN)</div>
        <div className="mega-menu">
          <span className="mega-label">Mega Menü</span>
          <div className="mega-list">
            {megaMenuItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="topbar-actions">
        <button className="action-btn" onClick={onSearch}>
          Ctrl+K Arama
        </button>
        <button className="action-btn">Sık Kullanılanlar</button>
        <button className="action-btn">Son Ekranlar</button>
      </div>
    </header>
  );
};

export default TopBar;
