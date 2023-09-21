import { RunOptions, runCommand } from "blowgun"

export async function run(argv: string[], runOptions?: RunOptions) {
  await runCommand(argv, __dirname, {
    print: console.log,
    noCommand: async (toolbox) => {
      toolbox.runOptions.print(`blowgun command not found: ${toolbox.parameters?.fullpath.join(" ")}`)
    },
    ...runOptions,
  })
}
