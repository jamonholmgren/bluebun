import { Command, InitialProps, Props } from "bluebun"

type CLIResponse = { props: Props; command: Command }

/**
 * Given initial props and a CLI, parses the arguments and options and returns the command and props.
 */
export async function cli(initialProps: InitialProps): Promise<CLIResponse> {
  // Ensure that there's a `commands` folder in the cliOptions.path
  const commandsFolder = Bun.file(`${initialProps.cliPath}/commands`)
  if (commandsFolder.size === 0) {
    console.log({ commandsFolder })
    console.error(`No "commands" folder found at ${initialProps.cliPath}`)
    process.exit(1)
  }

  const { name, cliPath, argv = process.argv } = initialProps

  let command: Command | undefined = undefined

  const commandPath: string[] = []
  const positionalArguments: string[] = []
  const options: { [key: string]: string | boolean } = {}

  // if a parameter is obviously an option, add it, otherwise check if it's a command, and if not, add it to
  // the currently pending option, if there is one, otherwise it's a parameter
  let pendingOption: string | undefined = undefined

  for (let i = 2; i < (argv || []).length; i += 1) {
    const arg = argv[i].replace(/^-+/, "")

    if (argv[i].startsWith("-")) {
      // replace "-" and "--" from the beginning of nextArg

      // if we have a previously pending option, then close that with `true` value
      if (pendingOption) options[pendingOption] = true
      pendingOption = undefined

      // if it has an =, then it's a key=value option
      if (arg.includes("=")) {
        const [key, value] = arg.split("=")
        // remove the -- or -
        options[key] = value
        continue
      }

      // now this is the pending option
      pendingOption = arg
      continue
    }

    // check if the folder exists or if there's a command with that name
    const folderExists = await Bun.file(`${cliPath}/commands/${[...commandPath, arg].join("/")}`).exists()

    // if the folder exists, then it's a command path, so set the command path and continue parsing
    if (folderExists) {
      commandPath.push(arg)
      pendingOption = undefined
      continue
    }

    try {
      // otherwise, try to import it as an actual command
      let module = await import(`${cliPath}/commands/${[...commandPath, arg].join("/")}.ts`)

      // it is an actual command, so set the command and continue parsing the rest of the args
      command = module.default
      commandPath.push(arg)
      pendingOption = undefined
      continue
    } catch (err) {
      // not a direct command, try importing it in a subfolder
      try {
        let module = await import(`${cliPath}/commands/${[...commandPath, arg, arg].join("/")}.ts`)

        // it is an actual command, so set the command and continue parsing the rest of the args
        command = module.default
        commandPath.push(arg)
        pendingOption = undefined
        continue
      } catch (err) {}
    }

    // okay, it's not a command, so if we have a pending option, then this is the value for that option
    if (pendingOption) {
      options[pendingOption] = arg
      pendingOption = undefined
      continue
    }

    // otherwise, it's a positional argument
    positionalArguments.push(arg)

    // keep looping! try to find more commands, options, and positional arguments
  }

  // close any pending options
  if (pendingOption) options[pendingOption] = true

  // no command, see if they provided a <cliname>.ts command as a last resort
  if (!command) {
    try {
      const module = await import(`${cliPath}/commands/${name}.ts`)
      command = module.default
    } catch (err) {}
  }

  // no command found -- this is our queue to exit with an error!
  if (!command) {
    const msg = `\n\nCommand not found: ${name}\n\nProvide a default command named ${name}.ts to avoid this in the future.\nLooked in: ${cliPath}/commands/\n\n`
    console.error(msg)
    process.exit(1)
  }

  return {
    command,
    props: {
      name,
      cliPath,
      argv,
      commandPath,
      arguments: positionalArguments,
      options,
      first: positionalArguments[0],
      second: positionalArguments[1],
      third: positionalArguments[2],
    },
  }
}
