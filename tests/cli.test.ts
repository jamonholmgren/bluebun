import { cli, type InitialProps } from "bluebun"
import { expect, test } from "bun:test"

const name = "bluebun"
const cliPath = __dirname + "/../cli"

test("bluebun version", async () => {
  const argv = ["/bin/bun", "/bin/bluebun", "version"]

  const { command, props } = await cli({ argv, name, cliPath })

  // make sure the command is the right one
  expect(command.name).toEqual("version")

  // check the props
  expect(props).toMatchObject({
    name,
    cliPath,
    argv,
    commandPath: ["version"],
    arguments: [],
    options: {},
  })
})

test("bluebun help", async () => {
  const argv = ["/bin/bun", "/bin/bluebun", "help"]

  const { command, props } = await cli({ argv, name, cliPath })

  // check the props
  expect(props).toMatchObject({
    name,
    cliPath,
    argv,
    commandPath: ["help"],
    arguments: [],
    options: {},
    first: undefined,
    second: undefined,
    third: undefined,
  })

  // make sure the command is the right one
  expect(command.name).toEqual("help")
})

test("passing in flags to the help command", async () => {
  const argv = [
    "/bin/bun",
    "/bin/bluebun",
    "help",
    "--verbose",
    "true",
    "--print=debug",
    "-b",
    "boilerplate",
    "-f",
    "-g",
  ]

  const { command, props } = await cli({ argv, name, cliPath })

  // check the props
  expect(props).toMatchObject({
    name,
    cliPath,
    argv,
    commandPath: ["help"],
    arguments: [],
    options: {
      verbose: "true",
      print: "debug",
      b: "boilerplate",
      f: true,
      g: true,
    },
    first: undefined,
    second: undefined,
    third: undefined,
  })

  // make sure the command is the right one
  expect(command.name).toEqual("help")
})

test("nested new command", async () => {
  const argv = ["/bin/bun", "/bin/bluebun", "new", "pizza", "cheese"]

  const { command, props } = await cli({ argv, name, cliPath })

  // check the props
  expect(props).toMatchObject({
    name,
    cliPath,
    argv,
    commandPath: ["new"],
    arguments: ["pizza", "cheese"],
    options: {},
    first: "pizza",
    second: "cheese",
    third: undefined,
  })

  // make sure the command is the right one
  expect(command.name).toEqual("new")
})
