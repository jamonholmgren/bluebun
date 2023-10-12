import { cli, type InitialProps } from "bluebun"
import { expect, test } from "bun:test"

const name = "bluebun"
const cliPath = __dirname + "/../cli"

test("bluebun default", async () => {
  const argv = ["/bin/bun", "/bin/bluebun"]

  const { command, props } = await cli({ argv, name, cliPath })

  // make sure the command is the right one
  expect(command.name).toEqual("bluebun")

  // check the props
  expect(props).toMatchObject({
    name,
    cliPath,
    argv,
    commandPath: [],
    arguments: [],
    options: {},
    first: undefined,
    second: undefined,
    third: undefined,
  })
})

test("bluebun nonexistant command", async () => {
  const argv = ["/bin/bun", "/bin/bluebun", "pizza"]

  const { command, props } = await cli({ argv, name, cliPath })

  // make sure the command is the right one
  expect(command.name).toEqual("bluebun")

  // check the props
  expect(props).toMatchObject({
    name,
    cliPath,
    argv,
    commandPath: [],
    arguments: ["pizza"],
    options: {},
    first: "pizza",
    second: undefined,
    third: undefined,
  })
})

test("bluebun nonexistant command after flag", async () => {
  const argv = ["/bin/bun", "/bin/bluebun", "--verbose=true", "pizza"]

  const { command, props } = await cli({ argv, name, cliPath })

  // make sure the command is the right one
  expect(command.name).toEqual("bluebun")

  // check the props
  expect(props).toMatchObject({
    name,
    cliPath,
    argv,
    commandPath: [],
    arguments: ["pizza"],
    options: { verbose: "true" },
    first: "pizza",
    second: undefined,
    third: undefined,
  })
})

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

test("checking aliases within nested commands, etc", async () => {
  const argv = ["/bin/bun", "/bin/bluebun", "t", "cli", "pizza", "cheese"]

  const { command, props } = await cli({ argv, name, cliPath })

  // check the props
  expect(props).toMatchObject({
    name,
    cliPath,
    argv,
    commandPath: ["testing", "cli"],
    arguments: ["pizza", "cheese"],
    options: {},
    first: "pizza",
    second: "cheese",
    third: undefined,
  })

  // make sure the command is the right one
  expect(command.name).toEqual("cli")
})

test("extremely complicated command, arguments, options", async () => {
  const argv = [
    "/bin/bun",
    "/bin/bluebun",
    "new",
    "pizza",
    "cheese",
    "pepperoni",
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
    commandPath: ["new"],
    arguments: ["pizza", "cheese", "pepperoni"],
    options: {
      verbose: "true",
      print: "debug",
      b: "boilerplate",
      f: true,
      g: true,
    },
    first: "pizza",
    second: "cheese",
    third: "pepperoni",
  })

  // make sure the command is the right one
  expect(command.name).toEqual("new")
})
