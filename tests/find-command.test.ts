import { expect, test } from "bun:test"
import { findCommand } from "bluebun"

test("findCommand", async () => {
  const result = await findCommand({
    name: "bluebun",
    cliPath: __dirname + "/../cli",
    argv: ["/bin/node", "/bin/bluebun", "version"],
    fullpath: ["version"],
    commandPath: ["version"],
    arguments: [],
    options: {},
  })

  expect(result).toBeTruthy()
  expect(result!.command).toBeTruthy()
  expect(result!.command.name).toBe("version")
})
