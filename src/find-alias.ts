import { type Command } from "bluebun"
import { type Dirent, promises } from "fs"

export async function findAlias(cliPath: string, commandPath: string[], arg: string): Promise<Command | undefined> {
  // TODO: replace with Bun equivalent to readdir eventually
  let otherCommands: Dirent[] = []
  try {
    otherCommands = await promises.readdir([cliPath, "commands", ...commandPath].join("/"), {
      withFileTypes: true,
    })
  } catch (err) {
    // if there isn't a directory at this path, then there's no way to have an alias here, so we bail early
    return
  }

  for (let commandFile of otherCommands) {
    let commandFilePath = [cliPath, "commands", ...commandPath, commandFile.name].join("/")

    if (commandFile.isDirectory()) {
      // if there's a command inside this directory with the same name, then we'll check that
      const dir = await promises.readdir([cliPath, "commands", ...commandPath, commandFile.name].join("/"), {
        withFileTypes: true,
      })
      const newCommandFile = dir.find((f) => f.name === commandFile.name + ".ts")
      if (newCommandFile) {
        commandFilePath = [cliPath, "commands", ...commandPath, commandFile.name, commandFile.name].join("/") + `.ts`
        commandFile = newCommandFile
      } else {
        // otherwise, skip this directory
        continue
      }
    } else if (commandFile.name.startsWith("_") || !commandFile.name.endsWith(".ts")) {
      // just skip non-ts files or files that start with _
      continue
    }

    // load the command up
    try {
      const module = await import(commandFilePath)

      const cmd = module.default
      const isAlias = cmd.alias === arg || (Array.isArray(cmd.alias) && cmd.alias.includes(arg))
      // success!
      if (isAlias) return cmd
    } catch (err) {}
  }
  return undefined
}
