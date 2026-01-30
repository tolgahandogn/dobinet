import { app } from 'electron';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type Database from 'better-sqlite3';
import { logInfo } from './logger';

const getMigrationsDir = () => {
  if (app.isPackaged) {
    return join(process.resourcesPath, 'migrations');
  }
  return join(app.getAppPath(), 'migrations');
};

export const runMigrations = (db: Database.Database) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT UNIQUE NOT NULL,
      applied_at TEXT NOT NULL
    );
  `);

  const applied = new Set(
    db.prepare('SELECT filename FROM schema_migrations').all().map((row: { filename: string }) => row.filename)
  );

  const migrationsDir = getMigrationsDir();
  const files = readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  files.forEach((file) => {
    if (applied.has(file)) {
      return;
    }
    const sql = readFileSync(join(migrationsDir, file), 'utf8');
    db.exec(sql);
    db.prepare('INSERT INTO schema_migrations (filename, applied_at) VALUES (?, ?)').run(
      file,
      new Date().toISOString()
    );
    logInfo(`Migration applied: ${file}`);
  });
};
