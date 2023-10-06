/**
 * Main entry point for blowgun.
 */
export { cli } from "./cli"
export { run } from "./run"
export { type CommandTree, commandTree } from "./command-tree"
export { commandHelp } from "./command-help"
export { print, write } from "./print"
export { specialKeys } from "./special-keys"
export { ask } from "./ask"
export { choose } from "./choose"
export { inputKey, inputKeys } from "./input"
export * from "./styles"
export * from "./cursor"
export * from "./spinner"
export * from "./progress"
export * from "./utils"

export type InitialProps = {
  /**
   * This is the name of the CLI. It's used to find the default command.
   * It's is required.
   */
  name: string

  /**
   * This is the path to the directory where the ./commands folder is.
   * It is required, because we have no other way to infer it.
   *
   * It's usually `__dirname + "/cli"`
   */
  cliPath: string

  /**
   * Usually process.argv, but can be changed for testing.
   */
  argv?: string[]
}

export type Props = {
  // cli configuraiton
  name: string
  cliPath: string

  // usually process.argv
  argv: string[]

  // these are added once the command is found
  commandPath?: string[]
  arguments?: string[]
  options: { [key: string]: string | boolean }
  first?: string // convenience for arguments[0]
  second?: string
  third?: string
}

export type Command = {
  name: string
  description: string
  run: (props: Props) => Promise<void>
  alias?: string | string[]
}
