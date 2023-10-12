import { Props, print, commandHelp, blue, bold, gray } from "bluebun"

export default {
  name: "bluebun",
  description: "Default command",
  run: async (props: Props) => {
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

    console.log(props.arguments)
  },
}
