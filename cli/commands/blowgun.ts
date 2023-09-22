import { Toolbox, print, color, style } from "blowgun"

export default {
  name: "blowgun",
  description: "Default command",
  run: async (toolbox: Toolbox) => {
    const red = color("red")
    const bold = style("bold")

    print(red(`Welcome to ${bold("Blowgun CLI")}!`))
    print(``)
    print(``)

    print(`  ${red("blowgun")} ${bold("help")}`)
  },
}
