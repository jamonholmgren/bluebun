import { type Props, spinStart, spinStop } from "bluebun"
import { getName } from "./_getName"

export default {
  name: "new",
  description: "Spins up a new Bluebun project",
  alias: "n",
  run: async (props: Props) => {
    // Ask for the project name if it wasn't given
    const projectName = await getName(props.first)

    spinStart(`Creating new project: ${projectName}`)
    await new Promise((r) => setTimeout(r, 5000))
    spinStop(`Created new project: ${projectName}`)
  },
}
