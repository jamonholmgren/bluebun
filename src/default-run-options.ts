import type { RunOptions } from "blowgun"

export const defaultRunOptions: RunOptions = {
  print: console.log,
  noCommand: async (toolbox) => {
    const print = toolbox.runOptions.print
    print(`blowgun command not found: ${toolbox.parameters?.fullpath.join(" ")}`)
  },
}
