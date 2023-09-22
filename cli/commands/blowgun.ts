import { Toolbox, print } from "blowgun"

export default {
  name: "blowgun",
  description: "Default command",
  run: async (toolbox: Toolbox) => {
    print(`Welcome to Blowgun CLI!`)
  },
}
