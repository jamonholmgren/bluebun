import { InitialRunOptions, RunOptions } from "blowgun"

/**
 * Basically a mock of console.log
 */
export function testRunOptions(extras: InitialRunOptions): RunOptions {
  const out = {
    argv: [],
    path: "",
    package: {
      name: "nopackage",
      version: "0.0.1",
    },
    async defaultCommand() {},
    ...extras,
  }
  return out
}
