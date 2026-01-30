import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('santiyenets', {
  getDiagnostics: () => ipcRenderer.invoke('app:get-diagnostics'),
  runBackup: () => ipcRenderer.invoke('app:run-backup'),
  restoreBackup: (path: string) => ipcRenderer.invoke('app:restore-backup', path)
});
