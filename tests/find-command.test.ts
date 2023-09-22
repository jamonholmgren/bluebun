import { expect, test } from "bun:test"
import { findCommand } from "blowgun"
import { testCLIOptions } from "./test-run-options"

test("findCommand", async () => {
  const result = await findCommand({
    cliOptions: testCLIOptions({
      argv: ["/bin/node", "/bin/blowgun", "version"],
      path: __dirname + "/../cli",
    }),
    parameters: {
      fullpath: ["version"],
      commandPath: ["version"],
      arguments: [],
      options: {},
      errors: [],
    },
  })

  expect(result).toBeTruthy()
  expect(result!.command).toBeTruthy()
  expect(result!.command.name).toBe("version")
})
