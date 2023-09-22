import * as readline from "node:readline/promises"

type AskFunction = {
  (prompt?: string): Promise<string>
  mock?: (prompt: string) => Promise<string> | string
}
export const ask: AskFunction = async (prompt: string = ""): Promise<string> => {
  if (ask.mock) return ask.mock(prompt)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const answer = await rl.question(prompt + " ")
  rl.close()
  return answer
}
