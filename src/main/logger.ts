import { app } from 'electron';
import { mkdirSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type LogType = 'app' | 'transfer';

const logPaths = new Map<LogType, string>();

export const getLogPath = (type: LogType) => {
  if (logPaths.has(type)) {
    return logPaths.get(type)!;
  }
  const baseDir = join(app.getPath('userData'), 'logs');
  mkdirSync(baseDir, { recursive: true });
  const filePath = join(baseDir, `${type}.log`);
  logPaths.set(type, filePath);
  return filePath;
};

const writeLine = (type: LogType, level: string, message: string) => {
  const filePath = getLogPath(type);
  const line = `${new Date().toISOString()} [${level}] ${message}\n`;
  appendFileSync(filePath, line, 'utf8');
};

export const logInfo = (message: string, type: LogType = 'app') => {
  writeLine(type, 'INFO', message);
};

export const logError = (message: string, type: LogType = 'app') => {
  writeLine(type, 'ERROR', message);
};

export const ensureLogDirectory = () => {
  const appLog = getLogPath('app');
  mkdirSync(dirname(appLog), { recursive: true });
};
