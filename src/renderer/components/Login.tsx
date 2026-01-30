import { useState } from 'react';

type Props = {
  onLogin: (role: string) => void;
};

const Login = ({ onLogin }: Props) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(role);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1>ŞantiyeNets (SN)</h1>
        <p>Offline ERP giriş ekranı</p>
        <form onSubmit={handleSubmit}>
          <label>
            Kullanıcı
            <input value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
          <label>
            Şifre
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <label>
            Rol
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="admin">Admin</option>
              <option value="muhasebe">Muhasebe</option>
              <option value="santiye">Şantiye</option>
            </select>
          </label>
          <button type="submit">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
