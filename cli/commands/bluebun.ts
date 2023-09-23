import { Toolbox, print, write, color, style, cursor } from "bluebun"
import { inputKey, inputLoop } from "../../src/input"

export default {
  name: "bluebun",
  description: "Default command",
  run: async (toolbox: Toolbox) => {
    const red = color("red")
    const bold = style("bold")

    print(red(`Welcome to ${bold("Bluebun CLI")}!`))
    print(``)
    print(`  ${red("bluebun")} ${bold("help")}`)
    print(`hello`)

    inputLoop((key) => {
      if (key === "up") {
        cursor.up()
      } else if (key === "down") {
        cursor.down()
      } else if (key === "right") {
        cursor.forward()
      } else if (key === "left") {
        cursor.back()
      } else if (key === "backspace") {
        cursor.back().erase(1)
      } else if (key === "delete") {
        cursor.erase(1)
      } else if (key === "enter") {
        write("\n")
      } else if (["escape", "ctrl-c", "q"].includes(key)) {
        return
      } else {
        write(key)
      }
    })
  },
}
