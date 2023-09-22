/**
 * Main entry point for blowgun.
 */
export { argvParser } from "./argv-parser"
export { runCommand } from "./run-command"
export { findCommand } from "./find-command"
export { print } from "./print-tools"
export { run } from "./run"

export type InitialRunOptions = {
  /**
   * Usually process.argv, but can be changed for testing.
   */
  argv?: string[]

  /**
   * This is the path to the directory where the ./commands folder is.
   */
  path?: string

  /**
   * This is the package.json of your CLI. Useful for getting the version, name, etc.
   * Not possible to type this because it's a dynamic import. Ce la vie.
   */
  package?: any

  /**
   * If no command is found, this is the default handler.
   */
  defaultCommand?: (toolbox: Toolbox) => Promise<void>
}

export type RunOptions = Required<InitialRunOptions>

export type Parameters = {
  // these are parsed from the argv
  argv: string[]
  fullpath: string[]
  options: { [key: string]: string | boolean }
  errors: string[]

  // these are added once the command is found
  commandPath?: string[]
  arguments?: string[]
}

export type Toolbox = {
  // these are provided by the caller
  runOptions: RunOptions
  // these are added by blowgun
  parameters: Parameters
}

export type Command = {
  name: string
  description: string
  run: (toolbox: Toolbox) => Promise<void>
}
