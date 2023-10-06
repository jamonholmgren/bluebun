import { type InitialProps, cli } from "./blowgun"

/**
 * This is the main entry point to your CLI and takes the initial run options,
 * parses the proper command, positional arguments, and options, and then
 * calls the command with all arguments and options defined.
 */
export async function run(initialProps: InitialProps) {
  const { command, props } = await cli(initialProps)

  await command.run(props)
}
