import { expect, test } from "bun:test"
import { run } from "../cli/run"
import { testRunOptions } from "./test-run-options"

test("blowgun version", async () => {
  const argv = ["/bin/node", "/bin/blowgun", "version"]
  // we give the CLI a fake console.log so we can test its output
  const options = testRunOptions()
  await run(argv, options)
  expect(options.output).toContain("0.0.1")
})

test("blowgun help", async () => {
  const argv = ["/bin/node", "/bin/blowgun", "help"]
  const options = testRunOptions()
  await run(argv, options)
  expect(options.output).toContain(`Commands:`)
})
