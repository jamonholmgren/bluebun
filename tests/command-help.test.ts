import { commandHelp, commandTree, stripANSI } from "bluebun"
import { expect, test } from "bun:test"

test("commandTree", async () => {
  const tree = await commandTree({ name: "bluebun", cliPath: __dirname + "/../cli" })

  expect(Object.keys(tree).sort()).toMatchObject(["default", "help", "demo", "testing", "new", "version"].sort())
  expect(Object.keys(tree["testing"].subcommands || {})).toMatchObject(["cli", "other"])

  expect(tree["testing"].subcommands?.cli.description).toContain("Just a test -- cli")
  expect(tree["testing"].subcommands?.other.description).toContain("Just a test -- other")
})

test("commandHelp", async () => {
  const help = await commandHelp({ name: "bluebun", cliPath: __dirname + "/../cli" })
  const helpStripped = stripANSI(help)

  expect(helpStripped).toContain("bluebun")
  expect(helpStripped).toContain("Spins up a new Bluebun project")
  expect(helpStripped).toContain("bluebun testing other Just a test -- other")
})
