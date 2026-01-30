import { Tab } from '../store/tabs';

type Props = {
  tabs: Tab[];
  activeId: string;
  onSelect: (id: Tab['id']) => void;
  onClose: (id: Tab['id']) => void;
};

const TabsBar = ({ tabs, activeId, onSelect, onClose }: Props) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div key={tab.id} className={`tab ${activeId === tab.id ? 'active' : ''}`}>
          <button className="tab-label" onClick={() => onSelect(tab.id)}>
            {tab.title}
          </button>
          {tab.id !== 'dashboard' && (
            <button className="tab-close" onClick={() => onClose(tab.id)}>
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabsBar;
