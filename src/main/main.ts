import { app, BrowserWindow, dialog } from 'electron';
import { join } from 'node:path';
import { ensureLogDirectory, logError, logInfo } from './logger';
import { getDb } from './db';
import { registerIpcHandlers } from './ipc';
import { seedDemoData } from './seed';
import { runDailyBackup } from './backup';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js')
    }
  });

  if (process.env.ELECTRON_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const singleInstance = app.requestSingleInstanceLock();
if (!singleInstance) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  ensureLogDirectory();
  logInfo('App starting');
  const db = getDb();
  seedDemoData(db);
  runDailyBackup();
  registerIpcHandlers();
  createWindow();
});

process.on('uncaughtException', (error) => {
  logError(`Uncaught exception: ${error.message}`);
  dialog.showErrorBox('Beklenmeyen Hata', error.message);
});

process.on('unhandledRejection', (reason: Error) => {
  logError(`Unhandled rejection: ${reason.message}`);
});
