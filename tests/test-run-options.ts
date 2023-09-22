import { InitialCLIOptions, CLIOptions } from "butterbun"

/**
 * Basically a mock of console.log
 */
export function testCLIOptions(extras: InitialCLIOptions): CLIOptions {
  const out = {
    name: "butterbun",
    argv: [],
    async defaultCommand() {},
    ...extras,
  }
  return out
}
