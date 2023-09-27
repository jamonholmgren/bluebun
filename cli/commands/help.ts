import { Props, print } from "bluebun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (props: Props) => {
    print(`bluebun help`)
    print(`  bluebun [command]`)
    print(``)
    print(`Commands:`)
    print(`  help`)
    print(`  version`)
  },
}
