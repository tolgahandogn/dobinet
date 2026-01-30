import DataGrid from '../components/DataGrid';
import Toolbar from '../components/Toolbar';

const columns = [
  { key: 'code', label: 'Stok Kodu' },
  { key: 'name', label: 'Malzeme' },
  { key: 'unit', label: 'Birim' },
  { key: 'warehouse', label: 'Depo' },
  { key: 'qty', label: 'Miktar' }
];

const rows = [
  {
    code: 'STK-001',
    name: 'C25 Beton',
    unit: 'm3',
    warehouse: 'Merkez',
    qty: '1.250'
  }
];

const Inventory = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Stok</h1>
        <div className="page-actions">
          <button>Yeni Stok Kartı</button>
          <button>Fiş Oluştur</button>
        </div>
      </div>
      <Toolbar />
      <div className="filters">
        <input placeholder="Kod veya ad" />
        <select>
          <option>Merkez Depo</option>
          <option>Şantiye Depo</option>
        </select>
      </div>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default Inventory;
