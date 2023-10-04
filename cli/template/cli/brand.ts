import { Props, print, colors, styles, commandHelp } from "bluebun"

export default {
  name: "NAME",
  description: "Default command",
  run: async (props: Props) => {
    const [THEME1, THEME2] = colors("THEME1", "THEME2")

    const [bold] = styles("bold")

    print(``)
    print(THEME1(bold(`NAME CLI`)))
    print(``)
    print(THEME2(` ${`version ` + require(props.cliPath + "/../package.json").version} • by ${bold(`AUTHOR`)}`))
    print(``)
    print(await commandHelp(props))
  },
}
