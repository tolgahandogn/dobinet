const Dashboard = () => {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="cards">
        <div className="card">
          <h3>Aktif Şantiye</h3>
          <p>12</p>
        </div>
        <div className="card">
          <h3>Toplam Hakediş (Brüt)</h3>
          <p>₺ 12.450.000</p>
        </div>
        <div className="card">
          <h3>Kalan Ödeme</h3>
          <p>₺ 3.150.000</p>
        </div>
        <div className="card">
          <h3>Vadesi Yakın Çek</h3>
          <p>14</p>
        </div>
      </div>
      <div className="section">
        <h2>Hızlı Erişim</h2>
        <div className="quick-links">
          <button>Yeni Hakediş</button>
          <button>Yeni Ödeme</button>
          <button>Stok Fişi</button>
          <button>Transfer (Excel)</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
