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
    testOutput: "",
    print(...msgs: any[]) {
      msgs.forEach((msg) => (out.testOutput += msg + "\n"))
    },
    async noCommand() {},
    ...extras,
  }
  return out
}
