import { Props, print } from "bluebun"
import { getName } from "./_getName"

export default {
  name: "new",
  description: "Spins up a new Bluebun project",
  run: async (props: Props) => {
    // Ask for the project name if it wasn't given
    const projectName = await getName(props.first)

    print(`Creating new project: ${projectName}`)
  },
}
