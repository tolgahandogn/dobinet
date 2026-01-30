import DataGrid from '../components/DataGrid';
import Toolbar from '../components/Toolbar';

const columns = [
  { key: 'no', label: 'Hakediş No' },
  { key: 'project', label: 'Şantiye' },
  { key: 'party', label: 'Taşeron' },
  { key: 'period', label: 'Dönem' },
  { key: 'status', label: 'Durum' },
  { key: 'net', label: 'Net Tutar' }
];

const rows = [
  {
    no: 'HKD-00045',
    project: 'İstanbul Şantiyesi',
    party: 'Demo Tedarikçi',
    period: '2024-05',
    status: 'Onaylandı',
    net: '₺ 320.000'
  }
];

const Entitlements = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Hakediş</h1>
        <div className="page-actions">
          <button>Yeni Hakediş</button>
          <button>Kesinti Şablonları</button>
        </div>
      </div>
      <Toolbar />
      <div className="filters">
        <input placeholder="Hakediş no, şantiye, taşeron" />
        <select>
          <option>Taslak</option>
          <option>Onaylandı</option>
          <option>Kısmi Ödendi</option>
          <option>Ödendi</option>
        </select>
      </div>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default Entitlements;
