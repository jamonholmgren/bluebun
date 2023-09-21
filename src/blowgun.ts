export { argvParser } from "./argv-parser"
export { runCommand } from "./run-command"
export { findCommand } from "./find-command"

export type CommandRun = {
  // these are parsed from the argv
  fullpath: string[]
  options: { [key: string]: string | boolean }
  errors: string[]

  // these are added once the command is found
  commandPath?: string[]
  parameters?: string[]
  command?: Command
}

export type RunOptions = {
  print: (...msg: any[]) => void
  noCommand?: (commandRun: CommandRun) => Promise<void>
}

export type Command = {
  name: string
  description: string
  run: (options: RunOptions) => Promise<void>
}
