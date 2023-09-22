import type { RunOptions, Toolbox } from "blowgun"
import { argvParser, findCommand } from "blowgun"

export async function runCommand(runOptions: RunOptions) {
  const toolbox: Toolbox = {
    runOptions,
    parameters: argvParser(runOptions.argv),
  }

  const foundCommand = await findCommand(toolbox)
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
