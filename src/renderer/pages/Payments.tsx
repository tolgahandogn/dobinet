import DataGrid from '../components/DataGrid';
import Toolbar from '../components/Toolbar';

const columns = [
  { key: 'date', label: 'Tarih' },
  { key: 'party', label: 'Cari' },
  { key: 'type', label: 'Tip' },
  { key: 'amount', label: 'Tutar' },
  { key: 'status', label: 'Durum' }
];

const rows = [
  {
    date: '15.06.2024',
    party: 'Demo Tedarikçi',
    type: 'Banka Havalesi/EFT',
    amount: '₺ 120.000',
    status: 'Tamamlandı'
  }
];

const Payments = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Ödemeler</h1>
        <div className="page-actions">
          <button>Yeni Ödeme</button>
          <button>Fiş Yazdır</button>
        </div>
      </div>
      <Toolbar />
      <div className="filters">
        <input placeholder="Cari, tutar, açıklama" />
        <select>
          <option>Tümü</option>
          <option>Nakit</option>
          <option>Banka Havalesi/EFT</option>
          <option>Çek</option>
          <option>Senet</option>
        </select>
      </div>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default Payments;
