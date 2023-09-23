import { expect, test } from "bun:test"
import { inputKey, inputLoop } from "bluebun"

test("inputKey", async () => {
  inputKey.mock = async () => "a"

  const key = await inputKey()
  expect(key).toBe("a")

  inputKey.mock = undefined
})

test("inputLoop", async () => {
  inputLoop.mock = async (onKey) => {
    await onKey("a")
    await onKey("b")
    await onKey(" ")
    await onKey("c")
    return
  }

  let result = ""
  await inputLoop(async (key) => {
    result += key
  })

  expect(result).toBe("ab c")

  inputLoop.mock = undefined
})
