import { CLIOptions, Toolbox, print } from "butterbun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (options: Toolbox) => {
    print(`butterbun help`)
    print(`  butterbun [command]`)
    print(``)
    print(`Commands:`)
    print(`  help`)
    print(`  version`)
  },
}
