import { RunOptions, runCommand } from "blowgun"

export async function run(argv: string[], runOptions: RunOptions) {
  await runCommand(argv, __dirname, runOptions)
}
