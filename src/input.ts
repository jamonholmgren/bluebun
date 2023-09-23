import { specialKeys } from "./special-keys"

type InputKeyFunction = {
  (): Promise<string>
  mock?: () => Promise<string> | string
}

export const inputKey: InputKeyFunction = async () => {
  if (inputKey.mock) return inputKey.mock()

  // wait for user input (1 key, including arrow keys)
  const key = (await new Promise((resolve) => {
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.once("data", (data) => {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      resolve(data.toString())
    })
  })) as string

  // if it's a special key, return the name
  const keySp = key as keyof typeof specialKeys
  if (specialKeys[keySp]) return specialKeys[keySp]

  // otherwise return the string
  return key
}

type InputLoopFunction = {
  (onKey: (key: string) => Promise<void | "break"> | void | "break"): Promise<void>
  mock?: (onKey: (key: string) => Promise<void | "break"> | void | "break") => Promise<void>
}

export const inputLoop: InputLoopFunction = async (onKey) => {
  if (inputLoop.mock) return inputLoop.mock(onKey)

  while (true) {
    const key = await inputKey()
    if (key === "ctrl-c") break
    const result = await onKey(key)
    if (result === "break") break
  }
}
