const templates = [
  'Cariler',
  'Şantiyeler',
  'Stok Kartları',
  'Hakediş (Başlık+Satır)',
  'Ödemeler',
  'Çek/Senet',
  'Stok Fişleri'
];

const Transfer = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Transfer (Excel/CSV)</h1>
        <div className="page-actions">
          <button>İçe Aktarım Sihirbazı</button>
          <button>Dışa Aktarım</button>
        </div>
      </div>
      <section className="section">
        <h2>Şablon Yönetimi</h2>
        <div className="template-grid">
          {templates.map((template) => (
            <div key={template} className="template-card">
              <h3>{template}</h3>
              <div className="template-actions">
                <button>Şablon Aç / İndir</button>
                <button>Mapping Kaydet</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>İçe Aktarım Özeti</h2>
        <div className="summary-grid">
          <div>
            <strong>Son Aktarım:</strong> 20.06.2024
          </div>
          <div>
            <strong>Başarılı:</strong> 48
          </div>
          <div>
            <strong>Hatalı:</strong> 2
          </div>
          <div>
            <strong>Log:</strong> transfer.log
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transfer;
