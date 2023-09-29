import { type Props, spinStart, spinStop, progressStart, progressUpdate, progressEnd, write, colors } from "bluebun"
import { getName } from "./_getName"

export default {
  name: "new",
  description: "Spins up a new Bluebun project",
  alias: "n",
  run: async (props: Props) => {
    const [green, gray] = colors("green", "gray")

    // Ask for the project name if it wasn't given
    const projectName = await getName(props.first)

    write(`Creating new project: ${projectName}\n`)

    progressStart({ length: 40, bar: green("▣"), empty: gray("⬚") })
    await new Promise((r) => setTimeout(r, 5000))
    progressUpdate(0.3)
    await new Promise((r) => setTimeout(r, 5000))
    progressUpdate(1)
    await new Promise((r) => setTimeout(r, 5000))
    progressUpdate(0.6)
    await new Promise((r) => setTimeout(r, 5000))
    progressUpdate(1.0)
    progressEnd()

    // spinStop(`Created new project: ${projectName}`)
  },
}
