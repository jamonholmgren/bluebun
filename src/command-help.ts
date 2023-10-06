import {
  type InitialProps,
  type CommandTree,
  commandTree,
  calcWidestCommandName,
  bold,
  cyan,
  gray,
  white,
} from "./blowgun"

export async function commandHelp(initialProps: InitialProps) {
  const { name } = initialProps

  const tree = await commandTree(initialProps)

  const widest = calcWidestCommandName(tree)

  function generateHelp(cmdTree: CommandTree, prefix: string): string[] {
    return Object.keys(cmdTree)
      .sort()
      .flatMap((key) => {
        const command = cmdTree[key]
        let lines: string[] = []

        const fullName = `${prefix} ${command.name === name ? "" : command.name}`.trim()
        lines.push(`${cyan(fullName).padEnd(widest)} ${gray(command.description)}`)

        if (command.subcommands) {
          lines.push(...generateHelp(command.subcommands, `${fullName}`))
        }

        return lines
      })
  }

  const helpLines = generateHelp(tree, name)

  const help = `${bold(white("Commands:"))}

  ${helpLines.join("\n  ")}
  `

  return help
}
