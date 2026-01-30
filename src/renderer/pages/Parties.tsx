import DataGrid from '../components/DataGrid';
import Toolbar from '../components/Toolbar';

const columns = [
  { key: 'code', label: 'Kod' },
  { key: 'name', label: 'Cari Adı' },
  { key: 'type', label: 'Tip' },
  { key: 'phone', label: 'Telefon' },
  { key: 'status', label: 'Durum' }
];

const rows = [
  {
    code: 'CR-0001',
    name: 'Demo Tedarikçi',
    type: 'Tedarikçi',
    phone: '0212 123 45 67',
    status: 'Aktif'
  }
];

const Parties = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Cariler</h1>
        <div className="page-actions">
          <button>360 Görünüm</button>
          <button>Hareketler</button>
        </div>
      </div>
      <Toolbar />
      <div className="filters">
        <input placeholder="Kod, ad, vergi no" />
        <select>
          <option>Tüm Tipler</option>
          <option>Taşeron</option>
          <option>Tedarikçi</option>
          <option>Müşteri</option>
        </select>
      </div>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default Parties;
