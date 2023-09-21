import type { CommandRun, Command } from "blowgun"

/**
 * Given an ParsedArgv, return the command to run based on
 * commands in the ./commands directory.
 */
export async function findCommand(parsed: CommandRun, dir: string): Promise<CommandRun> {
  // start with the last path element and work backwards
  for (let i = parsed.fullpath.length - 1; i >= 0; i -= 1) {
    const commandPath = parsed.fullpath.slice(0, i + 1)
    const parameters = parsed.fullpath.slice(i + 1)
    const filepath = commandPath.join("/")
    console.log(`/commands/${filepath}.ts`)

    try {
      const module = await import(`${dir}/commands/${filepath}.ts`)
      const command: Command = module.default
      return { ...parsed, commandPath, parameters, command }
    } catch (err) {
      // no command found, try the next one
      continue
    }
  }

  return parsed
}
