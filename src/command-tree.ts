import { type Command, type InitialProps } from "./bluebun"
import { promises } from "fs"

export type CommandTree = { [key: string]: Command & { subcommands?: CommandTree } }

/**
 * Builds a tree of commands from the ./commands folder.
 *
 * Subcommands are loaded recursively and added to the `subcommands` property of each parent command.
 *
 * The default command is at key "default" in the root level.
 */
export async function commandTree(initialProps: InitialProps, subfolder: string[] = []): Promise<CommandTree> {
  // explore the props.cliPath/commands/* folder
  const folderPath = [initialProps.cliPath, "commands", ...subfolder]
  const folder = folderPath.join("/")

  // check if the current path even exists -- if not, return empty
  try {
    await promises.stat(folder)
  } catch (err) {
    return {}
  }

  const commandsFolder = await promises.readdir(folder, { withFileTypes: true })

  const commands: CommandTree = {}

  if (subfolder.length === 0) {
    // load the commands/${name}.ts default command if it exists
    try {
      const module = await import([...folderPath, initialProps.name].join("/") + `.ts`)
      const cmd = module.default
      commands["default"] = cmd // "" is the default command
    } catch (err) {}
  }

  // for each file in the commands folder, try to load it up
  for (let commandFile of commandsFolder) {
    let currentCommand: Command | undefined = undefined

    // if it's the default command, then we already loaded it
    if (subfolder.length === 0 && commandFile.name === initialProps.name + ".ts") continue

    // if it's the same name as the folder, then we already loaded it
    if (commandFile.name === subfolder[subfolder.length - 1] + ".ts") continue

    // if it's a directory, then we need to explore it
    if (commandFile.isDirectory()) {
      // if there's a command inside this directory with the same name, then we'll check that

      // load the command up
      try {
        const module = await import([...folderPath, commandFile.name, commandFile.name].join("/") + `.ts`)
        currentCommand = module.default
      } catch (err) {}
    }

    if (!currentCommand) {
      // if it's a .ts file and not starting with _, it's a command file
      if (commandFile.name.startsWith("_") || !commandFile.name.endsWith(".ts")) continue

      try {
        const module = await import([...folderPath, commandFile.name].join("/"))
        currentCommand = module.default
      } catch (err) {}
    }

    if (currentCommand) {
      commands[currentCommand.name] = currentCommand

      // if there's a subfolder, then we need to explore that
      const subcommands = await commandTree(initialProps, [...subfolder, currentCommand.name])
      if (Object.keys(subcommands).length > 0) commands[currentCommand.name].subcommands = subcommands
    }
  }

  return commands
}
