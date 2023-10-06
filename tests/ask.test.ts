import { expect, test, beforeAll, afterAll } from "bun:test"
import { ask } from "blowgun"

beforeAll(() => {
  ask.mock = (input) => {
    if (input.includes("name")) return "Jamon"
    if (input.includes("old")) return "41"
    return ""
  }
})

afterAll(() => {
  ask.mock = undefined
})

test("ask", async () => {
  expect(await ask("What is your name?")).toBe("Jamon")
  expect(await ask("How old are you?")).toBe("41")
})
