import { Toolbox } from "blowgun"

export default {
  name: "generate",
  description: "Generates something",
  run: async (options: Toolbox) => {
    options.cliOptions.print(`blowgun generate`)
    options.cliOptions.print(options)
  },
}
