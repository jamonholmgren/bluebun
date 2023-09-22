import { run, print } from "butterbun"
import { expect, test, beforeEach, afterEach } from "bun:test"
import { testCLIOptions } from "./test-run-options"

beforeEach(() => {
  print.setMocked(true)
})

test("butterbun version", async () => {
  const argv = ["/bin/node", "/bin/butterbun", "version"]
  // we give the CLI a fake console.log so we can test its output
  const options = testCLIOptions({ argv, path: __dirname + "/../cli" })
  await run(options)
  expect(print.testOutput).toContain("0.0.1")
})

test("butterbun help", async () => {
  const argv = ["/bin/node", "/bin/butterbun", "help"]
  const options = testCLIOptions({ argv, path: __dirname + "/../cli" })
  await run(options)
  expect(print.testOutput).toContain(`Commands:`)
})

afterEach(() => {
  print.setMocked(false)
})
