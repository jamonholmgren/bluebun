import { Props, print, color, style, colors, styles, commandHelp } from "bluebun"

export default {
  name: "bluebun",
  description: "Default command",
  run: async (props: Props) => {
    const [blue, gray] = colors("blue", "gray")
    const [bold] = styles("bold")

    print(``)
    print(blue(bold(`Bluebun CLI`)))
    print(``)
    print(
      gray(
        ` ${`version ` + require(props.cliPath + "/../package.json").version} • by ${"Jamon Holmgren"} • ${blue(
          `bluebun.jamon.dev`
        )}`
      )
    )
    print(``)
    print(await commandHelp(props))
  },
}
