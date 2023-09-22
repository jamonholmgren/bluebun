import { InitialCLIOptions, CLIOptions } from "blowgun"

/**
 * Basically a mock of console.log
 */
export function testCLIOptions(extras: InitialCLIOptions): CLIOptions {
  const out = {
    name: "blowgun",
    argv: [],
    async defaultCommand() {},
    ...extras,
  }
  return out
}
