import { TabId } from '../store/tabs';

const items: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Şantiyeler' },
  { id: 'parties', label: 'Cariler' },
  { id: 'entitlements', label: 'Hakediş' },
  { id: 'payments', label: 'Ödemeler' },
  { id: 'cheques', label: 'Çek/Senet' },
  { id: 'inventory', label: 'Stok' },
  { id: 'reports', label: 'Raporlar' },
  { id: 'transfer', label: 'Transfer (Excel/CSV)' },
  { id: 'settings', label: 'Ayarlar' },
  { id: 'about', label: 'Hakkında' }
];

type Props = {
  onNavigate: (id: TabId) => void;
};

const Sidebar = ({ onNavigate }: Props) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Gezgin</div>
      <nav>
        {items.map((item) => (
          <button key={item.id} className="sidebar-item" onClick={() => onNavigate(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
