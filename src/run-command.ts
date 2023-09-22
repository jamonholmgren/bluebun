import type { CLIOptions, Toolbox } from "butterbun"
import { argvParser, findCommand, print } from "butterbun"

export async function runCommand(cliOptions: CLIOptions) {
  const toolbox: Toolbox = {
    cliOptions,
    parameters: argvParser(cliOptions.argv),
  }

  const foundCommand = await findCommand(toolbox)
  const { commandPath, parameters, command } = foundCommand || {}

  toolbox.parameters.commandPath = commandPath
  toolbox.parameters.arguments = parameters

  if (command) {
    await command.run(toolbox)
  } else {
    // no command found, so run the defaultCommand handler if it exists
    if (toolbox.cliOptions.defaultCommand) {
      await toolbox.cliOptions.defaultCommand(toolbox)
    } else {
      // otherwise, print the help message
      print(`butterbun command not found: ${toolbox.parameters.fullpath.join(" ")}`)
    }
  }
}
