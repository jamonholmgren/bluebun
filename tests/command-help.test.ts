import { commandHelp, commandTree, stripANSI } from "blowgun"
import { expect, test } from "bun:test"

test("commandTree", async () => {
  const tree = await commandTree({ name: "blowgun", cliPath: __dirname + "/../cli" })

  expect(Object.keys(tree).sort()).toMatchObject(["default", "help", "testing", "new", "version"].sort())
  expect(Object.keys(tree["testing"].subcommands || {})).toMatchObject(["cli", "other"])

  expect(tree["testing"].subcommands?.cli.description).toContain("Just a test -- cli")
  expect(tree["testing"].subcommands?.other.description).toContain("Just a test -- other")
})

test("commandHelp", async () => {
  const help = await commandHelp({ name: "blowgun", cliPath: __dirname + "/../cli" })
  const helpStripped = stripANSI(help)

  expect(helpStripped).toContain("blowgun")
  expect(helpStripped).toContain("Spins up a new Blowgun project")
  expect(helpStripped).toContain("blowgun testing other Just a test -- other")
})
