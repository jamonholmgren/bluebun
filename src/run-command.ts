import type { RunOptions, Toolbox } from "blowgun"
import { argvParser, defaultRunOptions, findCommand } from "blowgun"

export async function runCommand(argv: string[], dir: string, runOptions: RunOptions) {
  const toolbox: Toolbox = {
    runOptions: {
      ...defaultRunOptions,
      ...runOptions,
    },
    parameters: argvParser(argv),
  }

  const foundCommand = await findCommand(toolbox, dir)
  const { commandPath, parameters, command } = foundCommand || {}

  toolbox.parameters.commandPath = commandPath
  toolbox.parameters.arguments = parameters

  if (command) {
    await command.run(toolbox)
  } else {
    // no command found, so run the noCommand handler if it exists
    if (toolbox.runOptions.noCommand) {
      await toolbox.runOptions.noCommand(toolbox)
    } else {
      // otherwise, print the help message
      const print = toolbox.runOptions.print
      print(`blowgun command not found: ${toolbox.parameters.fullpath.join(" ")}`)
    }
  }
}
