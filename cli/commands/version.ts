import { Toolbox, print } from "blowgun"

export default {
  name: "version",
  description: "Prints the CLI version",
  run: async (toolbox: Toolbox) => {
    const version = (await import(toolbox.cliOptions.path + "/../package.json")).version

    print(version)
  },
}
