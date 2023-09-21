import { Toolbox } from "blowgun"

export default {
  name: "version",
  description: "Prints the CLI version",
  run: async (options: Toolbox) => {
    options.runOptions.print(`0.0.1`)
  },
}
