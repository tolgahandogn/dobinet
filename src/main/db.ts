import { app } from 'electron';
import Database from 'better-sqlite3';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { runMigrations } from './migrations';
import { logInfo } from './logger';

let dbInstance: Database.Database | null = null;

export const getDbPath = () => {
  const dataDir = app.getPath('userData');
  mkdirSync(dataDir, { recursive: true });
  return join(dataDir, 'santiyenets.db');
};

export const getDb = () => {
  if (dbInstance) {
    return dbInstance;
  }
  const dbPath = getDbPath();
  dbInstance = new Database(dbPath);
  dbInstance.pragma('journal_mode = WAL');
  dbInstance.pragma('foreign_keys = ON');
  runMigrations(dbInstance);
  logInfo(`Database ready at ${dbPath}`);
  return dbInstance;
};
