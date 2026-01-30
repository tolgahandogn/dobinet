import { app } from 'electron';
import { copyFileSync, mkdirSync, readdirSync, statSync, unlinkSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getDbPath } from './db';
import { logInfo } from './logger';

const getBackupDir = () => {
  const backupDir = join(app.getPath('userData'), 'backups');
  mkdirSync(backupDir, { recursive: true });
  return backupDir;
};

const getBackupStatePath = () => join(getBackupDir(), 'backup-state.json');

const updateBackupState = () => {
  const statePath = getBackupStatePath();
  writeFileSync(statePath, JSON.stringify({ lastRun: new Date().toISOString() }, null, 2), 'utf8');
};

export const runBackup = () => {
  const dbPath = getDbPath();
  const backupDir = getBackupDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = join(backupDir, `santiyenets-${timestamp}.db`);
  copyFileSync(dbPath, backupPath);
  logInfo(`Backup created at ${backupPath}`);
  updateBackupState();
  pruneBackups(backupDir);
  return backupPath;
};

export const runDailyBackup = () => {
  const statePath = getBackupStatePath();
  try {
    const state = JSON.parse(readFileSync(statePath, 'utf8')) as { lastRun: string };
    const lastRun = new Date(state.lastRun);
    const today = new Date();
    if (lastRun.toDateString() === today.toDateString()) {
      return null;
    }
  } catch {
    // No previous state, continue.
  }

  return runBackup();
};

const pruneBackups = (backupDir: string) => {
  const backups = readdirSync(backupDir)
    .map((file) => ({ file, path: join(backupDir, file) }))
    .filter((entry) => entry.file.endsWith('.db'))
    .sort((a, b) => statSync(b.path).mtimeMs - statSync(a.path).mtimeMs);

  backups.slice(7).forEach((entry) => {
    unlinkSync(entry.path);
  });
};
