/**
 * Basically a mock of console.log
 */
export function testRunOptions() {
  const out = {
    output: "",
    print(...msgs: any[]) {
      msgs.forEach((msg) => (out.output += msg + "\n"))
    },
  }
  return out
}
