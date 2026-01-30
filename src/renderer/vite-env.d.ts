/// <reference types="vite/client" />

declare global {
  interface Window {
    santiyenets: {
      getDiagnostics: () => Promise<{
        version: string;
        dbPath: string;
        logPath: string;
        transferLogPath: string;
      }>;
      runBackup: () => Promise<{ path: string }>;
      restoreBackup: (path: string) => Promise<{ ok: boolean }>;
    };
  }
}

export {};
