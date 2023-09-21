import { RunOptions, Toolbox } from "blowgun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (options: Toolbox) => {
    const print = options.runOptions.print
    print(`blowgun help`)
    print(`  blowgun [command]`)
    print(``)
    print(`Commands:`)
    print(`  help`)
    print(`  version`)
  },
}
