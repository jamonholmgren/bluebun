import { RunOptions } from "blowgun"

/**
 * Basically a mock of console.log
 */
export function testRunOptions(): RunOptions {
  const out = {
    testOutput: "",
    print(...msgs: any[]) {
      msgs.forEach((msg) => (out.testOutput += msg + "\n"))
    },
    async noCommand() {},
  }
  return out
}
