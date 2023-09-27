import { Props, print, ask } from "bluebun"

export default {
  name: "new",
  description: "Spins up a new Bluebun project",
  run: async (props: Props) => {
    // Get the project name from the first parameter
    let projectName = props.first

    if (!projectName) {
      // Ask for the project name
      projectName = await ask("What is the name of your cli project? (e.g. 'pizza-cli')")

      if (!projectName) {
        print("No project name given. Exiting.")
        process.exit(1)
      }
    }

    print(`Creating new project: ${projectName}`)
  },
}
