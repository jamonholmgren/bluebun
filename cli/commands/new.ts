import { Toolbox, print, ask } from "butterbun"

export default {
  name: "new",
  description: "Spins up a new Butterbun project",
  run: async (toolbox: Toolbox) => {
    // Ask for the project name

    const answer = await ask("hello!")
    print(answer)
  },
}
