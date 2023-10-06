import { Props, print, commandHelp, blue, bold, gray } from "blowgun"

export default {
  name: "blowgun",
  description: "Default command",
  run: async (props: Props) => {
    print(``)
    print(blue(bold(`Blowgun CLI`)))
    print(``)
    print(
      gray(
        ` ${`version ` + require(props.cliPath + "/../package.json").version} • by ${"Jamon Holmgren"} • ${blue(
          `blowgun.jamon.dev`
        )}`
      )
    )
    print(``)
    print(await commandHelp(props))
  },
}
