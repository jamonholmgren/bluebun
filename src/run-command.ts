import type { RunOptions, Toolbox } from "blowgun"
import { argvParser, findCommand, print } from "blowgun"

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
    // no command found, so run the defaultCommand handler if it exists
    if (toolbox.runOptions.defaultCommand) {
      await toolbox.runOptions.defaultCommand(toolbox)
    } else {
      // otherwise, print the help message
      print(`blowgun command not found: ${toolbox.parameters.fullpath.join(" ")}`)
    }
  }
}
