import { CLIOptions, Toolbox, print } from "blowgun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (options: Toolbox) => {
    print(`blowgun help`)
    print(`  blowgun [command]`)
    print(``)
    print(`Commands:`)
    print(`  help`)
    print(`  version`)
  },
}
