import { InitialCLIOptions, CLIOptions, runCommand, print, color } from "blowgun"

/**
 * This is the main entry point to your CLI and takes the initial run options
 * (which are all optional) and adds defaults, and then
 * calls runCommand with all options defined.
 */
export async function run(cliOptions: InitialCLIOptions) {
  // Ensure that there's a `commands` folder in the cliOptions.path, but only in dev
  const commandsFolder = Bun.file(`${cliOptions.path}/commands`)
  if (commandsFolder.size === 0) {
    console.log({ commandsFolder })
    console.error(`No "commands" folder found at ${cliOptions.path}`)
    process.exit(1)
  }

  // We add defaults to the object WITHOUT spreading to preserve the original reference
  cliOptions.argv ||= process.argv

  cliOptions.defaultCommand ||= async (toolbox) => {
    print(`command not found: ${toolbox.parameters?.fullpath.join(" ")}`)
  }

  const options = cliOptions as CLIOptions

  return runCommand(options)
}
