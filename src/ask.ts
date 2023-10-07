import * as readline from "node:readline/promises"
import { ansiColors, colorEnd, colorStart } from "./styles"
import { cursor } from "./cursor"
import { delay } from "./utils"

type AskOptions = {
  validation?: (answer: string) => true | string
  after?: "preserve" | "clear"
  inputColor?: keyof typeof ansiColors
}

type AskFunction = {
  (prompt?: string, askOptions?: AskOptions): Promise<string>
  mock?: (prompt: string) => Promise<string> | string
}

export const ask: AskFunction = async (prompt = "", askOptions = {}): Promise<string> => {
  if (ask.mock) return ask.mock(prompt)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  // await cursor.bookmark("ask-start")

  let answer = ""
  while (true) {
    answer = await rl.question(prompt + " " + colorStart(ansiColors[askOptions.inputColor || "gray"]))
    cursor.write(colorEnd) // reset color

    if (!askOptions.validation) break

    const valid = askOptions.validation(answer)
    if (valid !== true) {
      cursor.write(valid || "Invalid input.")
      // delay 1 second then clear the line
      await delay(1000)
      if (askOptions.after === "clear") {
        // cursor.eraseLine().jump("ask-start").eraseLine()
      } else {
        cursor.write("\n")
      }
      continue
    }

    break
  }

  if (askOptions.after === "clear") {
    // cursor.jump("ask-start").eraseLine()
  } else {
    cursor.write("\n")
  }

  rl.close()
  return answer
}
