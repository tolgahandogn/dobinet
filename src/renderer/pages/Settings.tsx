import { useEffect, useState } from 'react';

type Diagnostics = {
  version: string;
  dbPath: string;
  logPath: string;
  transferLogPath: string;
};

const Settings = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null);

  useEffect(() => {
    window.santiyenets.getDiagnostics().then(setDiagnostics);
  }, []);

  const handleBackup = async () => {
    await window.santiyenets.runBackup();
    alert('Yedek oluşturuldu.');
  };

  return (
    <div className="page">
      <h1>Ayarlar</h1>
      <section className="section">
        <h2>Kullanıcı Yönetimi</h2>
        <div className="summary-grid">
          <div>
            <strong>Admin:</strong> Tam yetki
          </div>
          <div>
            <strong>Muhasebe:</strong> Ödeme + Rapor
          </div>
          <div>
            <strong>Şantiye:</strong> Okuma + Fiş
          </div>
        </div>
      </section>
      <section className="section">
        <h2>Yedekleme</h2>
        <div className="summary-grid">
          <div>Günlük otomatik yedek (son 7).</div>
          <button onClick={handleBackup}>Şimdi Yedekle</button>
        </div>
      </section>
      <section className="section">
        <h2>Diagnostics</h2>
        {diagnostics ? (
          <div className="summary-grid">
            <div>
              <strong>Versiyon:</strong> {diagnostics.version}
            </div>
            <div>
              <strong>DB:</strong> {diagnostics.dbPath}
            </div>
            <div>
              <strong>App Log:</strong> {diagnostics.logPath}
            </div>
            <div>
              <strong>Transfer Log:</strong> {diagnostics.transferLogPath}
            </div>
          </div>
        ) : (
          <div>Yükleniyor...</div>
        )}
      </section>
    </div>
  );
};

export default Settings;
