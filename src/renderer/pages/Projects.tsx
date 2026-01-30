import DataGrid from '../components/DataGrid';
import Toolbar from '../components/Toolbar';

const columns = [
  { key: 'code', label: 'Kod' },
  { key: 'name', label: 'Şantiye Adı' },
  { key: 'status', label: 'Durum' },
  { key: 'start', label: 'Başlangıç' },
  { key: 'end', label: 'Bitiş' }
];

const rows = [
  {
    code: 'SN-PRJ-001',
    name: 'İstanbul Şantiyesi',
    status: 'Aktif',
    start: '15.01.2024',
    end: '-'
  }
];

const Projects = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Şantiyeler</h1>
        <div className="page-actions">
          <button>Dashboard</button>
          <button>Toplamlar</button>
        </div>
      </div>
      <Toolbar />
      <div className="filters">
        <input placeholder="Kod veya ad ara" />
        <select>
          <option>Aktif</option>
          <option>Kapalı</option>
        </select>
      </div>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default Projects;
