import { expect, test, beforeEach, afterEach } from "bun:test"
import { print } from "bluebun"

beforeEach(() => {
  print.setMocked(true)
})

afterEach(() => {
  print.setMocked(false)
})

test("print", () => {
  print("Hello, world!")
  expect(print.testOutput).toBe("Hello, world!\n")
})
