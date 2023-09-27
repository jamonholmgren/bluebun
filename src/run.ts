import { InitialProps, Props, print, color, argvParser, findCommand } from "bluebun"

/**
 * This is the main entry point to your CLI and takes the initial run options
 * (which are all optional) and adds defaults, and then
 * calls the proper command with all options defined.
 */
export async function run(initialProps: InitialProps) {
  // Ensure that there's a `commands` folder in the cliOptions.path, but only in dev
  const commandsFolder = Bun.file(`${initialProps.cliPath}/commands`)
  if (commandsFolder.size === 0) {
    console.log({ commandsFolder })
    console.error(`No "commands" folder found at ${initialProps.cliPath}`)
    process.exit(1)
  }

  const argv = initialProps.argv || process.argv

  const props: Props = {
    name: initialProps.name,
    cliPath: initialProps.cliPath,
    argv,
    ...argvParser(argv), // provides fullpath and options
  }

  const foundCommand = await findCommand(props)
  const { commandPath, parameters, command } = foundCommand || {}

  props.commandPath = commandPath
  props.arguments = parameters
  props.first = parameters?.[0]
  props.second = parameters?.[1]
  props.third = parameters?.[2]

  if (command) await command.run(props)

  if (!props.commandPath) {
    const red = color("red")
    print(red(`command not found: ${props.fullpath.join(" ")}`))
    console.log({ props })
    process.exit(1)
  }
}
