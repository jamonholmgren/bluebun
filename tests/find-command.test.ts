import { expect, test } from "bun:test"
import { findCommand } from "bluebun"

test("findCommand", async () => {
  const result = await findCommand({
    name: "bluebun",
    cliPath: __dirname + "/../cli",
    fullpath: ["version"],
  })

  expect(result).toBeTruthy()
  expect(result!.command).toBeTruthy()
  expect(result!.command.name).toBe("version")
})
