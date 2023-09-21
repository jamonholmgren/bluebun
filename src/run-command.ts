import { RunOptions, argvParser, findCommand } from "blowgun"

export async function runCommand(argv: string[], dir: string, runOptions: RunOptions) {
  const commandRun = argvParser(argv)
  const newCommandRun = await findCommand(commandRun, dir)

  if (newCommandRun.command) {
    await newCommandRun.command.run(runOptions)
  } else {
    // no command found, so run the noCommand handler if it exists
    if (runOptions.noCommand) {
      await runOptions.noCommand(newCommandRun)
    } else {
      // otherwise, print the help message
      runOptions.print(`blowgun command not found: ${newCommandRun.fullpath.join(" ")}`)
    }
  }
}
