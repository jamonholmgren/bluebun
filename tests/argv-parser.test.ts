import { expect, test } from "bun:test"
import { argvParser } from "butterbun"

test("argvParse with no args", () => {
  const command = "/something /else"
  const argv = command.split(" ")
  const result = argvParser(argv)
  expect(result).toEqual({
    fullpath: [],
    options: {},
    errors: [],
  })
})

test("argvParse", () => {
  const command = "/something /else parse one --foo bar --baz=qux --hello one --skip-jamon --boom"
  const argv = command.split(" ")
  const result = argvParser(argv)
  expect(result).toEqual({
    fullpath: ["parse", "one"],
    options: {
      foo: "bar",
      baz: "qux",
      hello: "one",
      jamon: false,
      boom: true,
    },
    errors: [],
  })
})

test("argvParse with errors", () => {
  const command = "/something /else parse one --foo bar -xyz --baz=qux --hello one --skip-jamon extra"
  const argv = command.split(" ")
  const result = argvParser(argv)
  expect(result).toEqual({
    fullpath: ["parse", "one"],
    options: {
      foo: "bar",
      baz: "qux",
      hello: "one",
      jamon: false,
      x: true,
      y: true,
      z: true,
    },
    errors: ["Unknown option: extra"],
  })
})
