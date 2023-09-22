import { run, print } from "blowgun"
import { expect, test, beforeEach, afterEach } from "bun:test"
import { testRunOptions } from "./test-run-options"

beforeEach(() => {
  print.setTesting(true)
})

test("blowgun version", async () => {
  const argv = ["/bin/node", "/bin/blowgun", "version"]
  // we give the CLI a fake console.log so we can test its output
  const options = testRunOptions({ argv, path: __dirname + "/../cli" })
  await run(options)
  expect(print.testOutput).toContain("0.0.1")
})

test("blowgun help", async () => {
  const argv = ["/bin/node", "/bin/blowgun", "help"]
  const options = testRunOptions({ argv, path: __dirname + "/../cli" })
  await run(options)
  expect(print.testOutput).toContain(`Commands:`)
})

afterEach(() => {
  print.setTesting(false)
})
