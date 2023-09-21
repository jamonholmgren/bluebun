/**
 * Main entry point for blowgun.
 */
export { argvParser } from "./argv-parser"
export { runCommand } from "./run-command"
export { findCommand } from "./find-command"
export { defaultRunOptions } from "./default-run-options"

export type RunOptions = {
  testOutput?: string
  print: (...msg: any[]) => void
  noCommand: (toolbox: Toolbox) => Promise<void>
}

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
