import { Toolbox } from "blowgun"

export default {
  name: "blowgun",
  description: "Default command",
  run: async (toolbox: Toolbox) => {
    toolbox.runOptions.print(toolbox.runOptions.package.version)
  },
}
