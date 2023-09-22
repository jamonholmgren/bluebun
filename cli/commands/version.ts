import { Toolbox, print } from "blowgun"

export default {
  name: "version",
  description: "Prints the CLI version",
  run: async (toolbox: Toolbox) => {
    print(toolbox.runOptions.package.version)
  },
}
