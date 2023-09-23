import type { Toolbox, Command } from "./bluebun"

export type FindCommandResult = {
  commandPath: string[]
  parameters: string[]
  command: Command
}

/**
 * Given a CommandRun, updates it with the right command to run based on
 * commands it finds in the ./commands directory.
 */
export async function findCommand(toolbox: Toolbox): Promise<FindCommandResult | undefined> {
  const commandsPath = toolbox.cliOptions.path

  // start with the last path element and work backwards
  const fullpath = toolbox.parameters.fullpath
  for (let i = fullpath.length - 1; i >= 0; i -= 1) {
    const commandPath = fullpath.slice(0, i + 1)
    const parameters = fullpath.slice(i + 1)
    const filepath = commandPath.join("/")

    // try ./path/to/command.ts
    try {
      const module = await import(`${commandsPath}/commands/${filepath}.ts`)
      const command: Command = module.default
      return { ...toolbox, commandPath, parameters, command }
    } catch (err) {
      // no command found, move on
    }

    // also try ./path/to/command/command.ts
    try {
      const module = await import(`${commandsPath}/commands/${filepath}/${commandPath.at(-1)}.ts`)
      const command: Command = module.default
      return { commandPath, parameters, command }
    } catch (err) {
      // no command found, try the next one
    }
  }

  // no command, see if they provided a <cliname>.ts command as a last resort
  try {
    const module = await import(`${commandsPath}/commands/${toolbox.cliOptions.name}.ts`)
    const command: Command = module.default
    return { commandPath: [], parameters: [], command }
  } catch (err) {
    // no command found, move on
  }

  // didn't find a command, so just return an empty object
  return
}
