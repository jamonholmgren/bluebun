import { Toolbox, print, ask } from "blowgun"

export default {
  name: "new",
  description: "Spins up a new Blowgun project",
  run: async (toolbox: Toolbox) => {
    // Ask for the project name

    const answer = await ask("hello!")
    print(answer)
  },
}
