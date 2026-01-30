import type Database from 'better-sqlite3';
import { logInfo } from './logger';

export const seedDemoData = (db: Database.Database) => {
  const count = db.prepare('SELECT COUNT(*) as count FROM parties').get() as { count: number };
  if (count.count > 0) {
    return;
  }
  db.prepare(
    `INSERT INTO parties (code, name, phone, email, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run('CR-0001', 'Demo Tedarikçi', '0212 123 45 67', 'demo@tedarikci.com', 'active', new Date().toISOString(), new Date().toISOString());

  db.prepare(
    `INSERT INTO projects (code, name, address, status, start_date, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run('SN-PRJ-001', 'İstanbul Şantiyesi', 'İstanbul', 'active', '2024-01-15', new Date().toISOString(), new Date().toISOString());

  logInfo('Demo data seeded.');
};
