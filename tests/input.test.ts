import { expect, test } from "bun:test"
import { inputKey, inputKeys } from "bluebun"

test("inputKey", async () => {
  inputKey.mock = async () => "a"

  const key = await inputKey()
  expect(key).toBe("a")

  inputKey.mock = undefined
})

test("inputKeys", async () => {
  const keys = ["a", "b", "c"]
  inputKey.mock = async () => {
    const key = keys.shift()
    if (!key) throw new Error("too many keys")
    return key
  }

  const keysPressed: string[] = []
  const d = await inputKeys(async (key) => {
    keysPressed.push(key)
    if (key === "c") return "done"
  })

  expect(keysPressed).toEqual(["a", "b", "c"])
  expect(d).toBe("done")

  inputKey.mock = undefined
})
