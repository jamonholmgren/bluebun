import { Toolbox, print, color, style, cursor } from "blowgun"
import { inputKey } from "../../src/input"

export default {
  name: "blowgun",
  description: "Default command",
  run: async (toolbox: Toolbox) => {
    const red = color("red")
    const bold = style("bold")

    print(red(`Welcome to ${bold("Blowgun CLI")}!`))
    print(``)
    print(`  ${red("blowgun")} ${bold("help")}`)
    print(`hello`)

    while (true) {
      const key = await inputKey()

      if (key === "up") {
        cursor.up()
      } else if (key === "down") {
        cursor.down()
      } else if (key === "right") {
        cursor.forward()
      } else if (key === "left") {
        cursor.back()
      } else if (key === "backspace") {
        cursor.back()
        cursor.erase()
      } else if (["escape", "ctrl-c", "q"].includes(key)) {
        break
      }
    }
  },
}
