import type { CommandRun, Command } from "blowgun"

/**
 * Given a CommandRun, updates it with the right command to run based on
 * commands it finds in the ./commands directory.
 */
export async function findCommand(parsed: CommandRun, dir: string): Promise<CommandRun> {
  // start with the last path element and work backwards
  for (let i = parsed.fullpath.length - 1; i >= 0; i -= 1) {
    const commandPath = parsed.fullpath.slice(0, i + 1)
    const parameters = parsed.fullpath.slice(i + 1)
    const filepath = commandPath.join("/")

    try {
      const module = await import(`${dir}/commands/${filepath}.ts`)
      const command: Command = module.default
      return { ...parsed, commandPath, parameters, command }
    } catch (err) {
      // no command found, try the next one
      continue
    }
  }

  // didn't find a command, so just return the original parsed command
  return parsed
}
