import { Toolbox } from "butterbun"

export default {
  name: "generate",
  description: "Generates something",
  run: async (options: Toolbox) => {
    options.cliOptions.print(`butterbun generate`)
    options.cliOptions.print(options)
  },
}
