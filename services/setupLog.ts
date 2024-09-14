import * as log from "@std/log";

export function setupLog(logger: typeof log) {
  logger.setup({
    handlers: {
      default: new log.ConsoleHandler("DEBUG", {
        formatter: (record) =>
          `${new Date().toISOString()} [${record.levelName}] ${record.msg}${
            record.args && record.args.length
              ? (" | ARGS = " + JSON.stringify(record.args))
              : ""
          }`,
        useColors: false,
      }),
    },
  });
}
