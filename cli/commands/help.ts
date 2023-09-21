import { RunOptions } from "blowgun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (options: RunOptions) => {
    options.print(`blowgun help`)
    options.print(`  blowgun [command]`)
    options.print(``)
    options.print(`Commands:`)
    options.print(`  help`)
    options.print(`  version`)
  },
}
