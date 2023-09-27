import { Props, print, ask } from "bluebun"

export default {
  name: "new",
  description: "Spins up a new Bluebun project",
  run: async (props: Props) => {
    // Ask for the project name

    const answer = await ask("hello!")
    print(answer)
  },
}
