import { RunOptions } from "blowgun"

export default {
  name: "generate",
  description: "Generates something",
  run: async (options: RunOptions) => {
    options.print(`blowgun generate`)
    options.print(options)
  },
}
