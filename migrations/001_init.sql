PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  start_date TEXT,
  end_date TEXT,
  status TEXT NOT NULL,
  notes TEXT,
  is_deleted INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS parties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  tax_no TEXT,
  tax_office TEXT,
  address TEXT,
  iban TEXT,
  notes TEXT,
  status TEXT NOT NULL,
  is_deleted INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS entitlements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entitlement_no TEXT NOT NULL,
  project_id INTEGER NOT NULL,
  party_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  gross_amount INTEGER DEFAULT 0,
  net_amount INTEGER DEFAULT 0,
  paid_total INTEGER DEFAULT 0,
  remaining INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  created_by TEXT,
  updated_at TEXT NOT NULL,
  updated_by TEXT,
  is_deleted INTEGER DEFAULT 0,
  FOREIGN KEY(project_id) REFERENCES projects(id),
  FOREIGN KEY(party_id) REFERENCES parties(id)
);

CREATE TABLE IF NOT EXISTS entitlement_lines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entitlement_id INTEGER NOT NULL,
  work_type TEXT,
  description TEXT,
  unit TEXT,
  qty REAL NOT NULL,
  unit_price INTEGER NOT NULL,
  line_total INTEGER NOT NULL,
  FOREIGN KEY(entitlement_id) REFERENCES entitlements(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS entitlement_deductions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entitlement_id INTEGER NOT NULL,
  reason TEXT,
  amount INTEGER NOT NULL,
  FOREIGN KEY(entitlement_id) REFERENCES entitlements(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  party_id INTEGER,
  project_id INTEGER,
  entitlement_id INTEGER,
  type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(party_id) REFERENCES parties(id),
  FOREIGN KEY(project_id) REFERENCES projects(id),
  FOREIGN KEY(entitlement_id) REFERENCES entitlements(id)
);

CREATE TABLE IF NOT EXISTS cheques (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  direction TEXT NOT NULL,
  number TEXT NOT NULL,
  bank TEXT,
  branch TEXT,
  owner TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'TRY',
  issue_date TEXT,
  due_date TEXT,
  status TEXT NOT NULL,
  party_id INTEGER,
  project_id INTEGER,
  FOREIGN KEY(party_id) REFERENCES parties(id),
  FOREIGN KEY(project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  material_group TEXT,
  min_stock REAL,
  vat_rate REAL,
  notes TEXT,
  is_deleted INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS warehouses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stock_moves (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  date TEXT NOT NULL,
  warehouse_id INTEGER NOT NULL,
  project_id INTEGER,
  party_id INTEGER,
  description TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY(project_id) REFERENCES projects(id),
  FOREIGN KEY(party_id) REFERENCES parties(id)
);

CREATE TABLE IF NOT EXISTS stock_move_lines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stock_move_id INTEGER NOT NULL,
  material_id INTEGER NOT NULL,
  qty REAL NOT NULL,
  unit_price INTEGER,
  FOREIGN KEY(stock_move_id) REFERENCES stock_moves(id) ON DELETE CASCADE,
  FOREIGN KEY(material_id) REFERENCES materials(id)
);

CREATE TABLE IF NOT EXISTS attachments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entitlement_id INTEGER NOT NULL,
  file_path TEXT NOT NULL,
  file_hash TEXT NOT NULL,
  metadata TEXT,
  stored_copy INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY(entitlement_id) REFERENCES entitlements(id)
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity TEXT NOT NULL,
  entity_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  payload TEXT,
  created_at TEXT NOT NULL,
  created_by TEXT
);
