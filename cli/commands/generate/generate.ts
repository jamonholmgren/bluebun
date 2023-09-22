import { Toolbox } from "blowgun"

export default {
  name: "generate",
  description: "Generates something",
  run: async (options: Toolbox) => {
    options.runOptions.print(`blowgun generate`)
    options.runOptions.print(options)
  },
}
