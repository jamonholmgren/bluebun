import { specialKeys } from "./special-keys"

export async function inputKey(): Promise<string> {
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

export async function inputLoop(onKey: (key: string) => Promise<void | "break"> | void | "break") {
  while (true) {
    const key = await inputKey()
    if (key === "ctrl-c") break
    const result = await onKey(key)
    if (result === "break") break
  }
}
