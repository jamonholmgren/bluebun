import { InitialCLIOptions, CLIOptions } from "bluebun"

/**
 * Basically a mock of console.log
 */
export function testCLIOptions(extras: InitialCLIOptions): CLIOptions {
  const out = {
    name: "bluebun",
    argv: [],
    async defaultCommand() {},
    ...extras,
  }
  return out
}
