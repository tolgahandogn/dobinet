const About = () => {
  const year = new Date().getFullYear();
  return (
    <div className="page">
      <h1>Hakkında</h1>
      <div className="about-box">
        <p>
          ŞantiyeNets (SN) — Tolgahan Doğan tarafından yapılmıştır. © {year} Tüm hakları saklıdır.
        </p>
        <p>
          Offline-first, Windows odaklı ERP deneyimi için tasarlanmış; hızlı veri girişleri,
          yoğun ızgara ekranları ve Excel transferi iş akışlarını destekler.
        </p>
      </div>
    </div>
  );
};

export default About;
