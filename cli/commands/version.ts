import { RunOptions } from "blowgun"

export default {
  name: "version",
  description: "Prints the CLI version",
  run: async (options: RunOptions) => {
    options.print(`0.0.1`)
  },
}
