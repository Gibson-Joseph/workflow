import { Log, LogCollector, LogFuncion, LogLevel, LogLevels } from '@/type/log';

export function createLogCollector(): LogCollector {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFuncions = {} as Record<LogLevel, LogFuncion>;
  LogLevels.forEach(
    (level) =>
      (logFuncions[level] = (message: string) => {
        logs.push({
          message: message,
          level,
          timestamp: new Date(),
        });
      })
  );

  return {
    getAll,
    ...logFuncions,
  };
}
