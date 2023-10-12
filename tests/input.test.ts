import { expect, test } from "bun:test"
import { inputKey, inputKeys } from "bluebun"

test("inputKey", async () => {
  inputKey.mock = async () => "a"

  const key = await inputKey()
  expect(key).toBe("a")

  inputKey.mock = undefined
})

test("inputKeys", async () => {
  inputKeys.mock = async (onKey) => {
    await onKey("a")
    await onKey("b")
    await onKey(" ")
    await onKey("c")
    return
  }

  let result = ""
  await inputKeys(async (key) => {
    result += key
  })

  expect(result).toBe("ab c")

  inputKeys.mock = undefined
})
