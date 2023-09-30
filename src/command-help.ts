import { type InitialProps, commandTree, colors, styles, CommandTree } from "./bluebun"

export async function commandHelp(initialProps: InitialProps) {
  const { name } = initialProps
  const [bold] = styles("bold")
  const [white, gray, cyan] = colors("white", "gray", "cyan")

  const tree = await commandTree(initialProps)

  const calcWidest = (cmdTree: CommandTree, start: number = 10): number => {
    return Object.keys(cmdTree).reduce((acc, key) => {
      const { name, subcommands } = cmdTree[key]
      const subcommandsWidest = subcommands ? calcWidest(subcommands, acc + 1 + name.length) : 0
      return Math.max(acc, name.length, subcommandsWidest)
    }, start)
  }

  const widest = calcWidest(tree) + 12 // add 12 for ansi color codes

  const generateHelp = (cmdTree: CommandTree, prefix: string): string[] => {
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
