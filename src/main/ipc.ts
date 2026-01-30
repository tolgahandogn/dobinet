import { ipcMain, app } from 'electron';
import { copyFileSync } from 'node:fs';
import { getDbPath, getDb } from './db';
import { getLogPath, logInfo } from './logger';
import { runBackup } from './backup';

export const registerIpcHandlers = () => {
  ipcMain.handle('app:get-diagnostics', () => {
    return {
      version: app.getVersion(),
      dbPath: getDbPath(),
      logPath: getLogPath('app'),
      transferLogPath: getLogPath('transfer')
    };
  });

  ipcMain.handle('app:run-backup', () => {
    const path = runBackup();
    return { path };
  });

  ipcMain.handle('app:restore-backup', (_event, backupPath: string) => {
    const dbPath = getDbPath();
    copyFileSync(backupPath, dbPath);
    logInfo(`Database restored from ${backupPath}`);
    getDb().close();
    app.relaunch();
    app.exit(0);
    return { ok: true };
  });
};
