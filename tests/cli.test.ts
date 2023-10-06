import { cli, type InitialProps } from "blowgun"
import { expect, test } from "bun:test"

const name = "blowgun"
const cliPath = __dirname + "/../cli"

test("blowgun default", async () => {
  const argv = ["/bin/bun", "/bin/blowgun"]

  const { command, props } = await cli({ argv, name, cliPath })

  // make sure the command is the right one
  expect(command.name).toEqual("blowgun")

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

test("blowgun nonexistant command", async () => {
  const argv = ["/bin/bun", "/bin/blowgun", "pizza"]

  const { command, props } = await cli({ argv, name, cliPath })

  // make sure the command is the right one
  expect(command.name).toEqual("blowgun")

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

test("blowgun nonexistant command after flag", async () => {
  const argv = ["/bin/bun", "/bin/blowgun", "--verbose=true", "pizza"]

  const { command, props } = await cli({ argv, name, cliPath })

  // make sure the command is the right one
  expect(command.name).toEqual("blowgun")

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

test("blowgun version", async () => {
  const argv = ["/bin/bun", "/bin/blowgun", "version"]

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

test("blowgun help", async () => {
  const argv = ["/bin/bun", "/bin/blowgun", "help"]

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
    "/bin/blowgun",
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
  const argv = ["/bin/bun", "/bin/blowgun", "new", "pizza", "cheese"]

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
  const argv = ["/bin/bun", "/bin/blowgun", "t", "cli", "pizza", "cheese"]

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
    "/bin/blowgun",
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
