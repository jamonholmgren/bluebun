import { Toolbox } from "bluebun"

export default {
  name: "generate",
  description: "Generates something",
  run: async (options: Toolbox) => {
    options.cliOptions.print(`bluebun generate`)
    options.cliOptions.print(options)
  },
}
