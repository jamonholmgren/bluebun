import { Props, print, color, style } from "bluebun"

export default {
  name: "bluebun",
  description: "Default command",
  run: async (_props: Props) => {
    const red = color("red")
    const bold = style("bold")

    print(red(`Welcome to ${bold("Bluebun CLI")}!`))
    print(``)
    print(`  ${red("bluebun")} ${bold("help")}`)
    print(`hello`)
  },
}
