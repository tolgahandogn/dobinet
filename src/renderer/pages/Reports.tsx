const reports = [
  'Cari Yaşlandırma',
  'Şantiye Özet',
  'Hakediş Listesi',
  'Ödeme Listesi',
  'Çek/Senet Vade Takvimi',
  'Stok Hareket Özeti'
];

const Reports = () => {
  return (
    <div className="page">
      <h1>Raporlar</h1>
      <div className="report-grid">
        {reports.map((report) => (
          <div key={report} className="report-card">
            <h3>{report}</h3>
            <div className="report-actions">
              <button>CSV</button>
              <button>XLSX</button>
              <button>Yazdır</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
