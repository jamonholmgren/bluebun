/**
 * Main entry point for blowgun.
 */
export { argvParser } from "./argv-parser"
export { runCommand } from "./run-command"
export { findCommand } from "./find-command"
export { print, write } from "./print"
export { run } from "./run"
export { specialKeys } from "./special-keys"
export { ask } from "./ask"
export { inputKey, inputLoop } from "./input"
export * from "./styles"
export * from "./cursor"

export type InitialCLIOptions = {
  /**
   * This is the name of the CLI. It's used to find the default command.
   * It's is required.
   */
  name?: string

  /**
   * This is the path to the directory where the ./commands folder is.
   * It is required, because we have no other way to infer it.
   */
  path: string

  /**
   * Usually process.argv, but can be changed for testing.
   */
  argv?: string[]

  /**
   * If no command is found, this is the default handler.
   */
  defaultCommand?: (toolbox: Toolbox) => Promise<void>
}

export type CLIOptions = Required<InitialCLIOptions>

export type Parameters = {
  // these are parsed from the argv
  fullpath: string[]
  options: { [key: string]: string | boolean }
  errors: string[]

  // these are added once the command is found
  commandPath?: string[]
  arguments?: string[]
}

export type Toolbox = {
  // these are provided by the caller
  cliOptions: CLIOptions
  // these are added by blowgun
  parameters: Parameters
}

export type Command = {
  name: string
  description: string
  run: (toolbox: Toolbox) => Promise<void>
}
