import DataGrid from '../components/DataGrid';
import Toolbar from '../components/Toolbar';

const columns = [
  { key: 'number', label: 'No' },
  { key: 'direction', label: 'Yön' },
  { key: 'bank', label: 'Banka' },
  { key: 'amount', label: 'Tutar' },
  { key: 'due', label: 'Vade' },
  { key: 'status', label: 'Durum' }
];

const rows = [
  {
    number: 'CHK-4587',
    direction: 'Alınan',
    bank: 'Garanti',
    amount: '₺ 75.000',
    due: '10.07.2024',
    status: 'Portföyde'
  }
];

const Cheques = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Çek / Senet</h1>
        <div className="page-actions">
          <button>Vade Takvimi</button>
          <button>Ödeme Oluştur</button>
        </div>
      </div>
      <Toolbar />
      <div className="filters">
        <input placeholder="No, banka, cari" />
        <select>
          <option>Portföyde</option>
          <option>Tahsil Edildi</option>
          <option>İade</option>
          <option>İptal</option>
        </select>
      </div>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default Cheques;
