import { TabId } from '../store/tabs';

const quickLinks: { id: TabId; label: string; shortcut: string }[] = [
  { id: 'projects', label: 'Şantiyeler', shortcut: 'PRJ' },
  { id: 'parties', label: 'Cariler', shortcut: 'CAR' },
  { id: 'entitlements', label: 'Hakediş', shortcut: 'HKD' },
  { id: 'payments', label: 'Ödemeler', shortcut: 'ODM' },
  { id: 'inventory', label: 'Stok', shortcut: 'STK' }
];

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: TabId) => void;
};

const SearchModal = ({ open, onClose, onNavigate }: Props) => {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Global Arama</h3>
          <button onClick={onClose}>×</button>
        </div>
        <input className="modal-input" placeholder="Ekran veya kayıt ara..." autoFocus />
        <div className="modal-list">
          {quickLinks.map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)}>
              {item.label}
              <span>{item.shortcut}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
