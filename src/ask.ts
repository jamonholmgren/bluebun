import * as readline from "node:readline/promises"

type AskOptions = {
  validation?: (answer: string) => true | string
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

  let answer = ""
  while (true) {
    answer = await rl.question(prompt + " ")

    if (!askOptions.validation) break

    const valid = askOptions.validation(answer)
    if (valid !== true) {
      console.log(valid || "Invalid input.")
      continue
    }

    break
  }

  rl.close()
  return answer
}
