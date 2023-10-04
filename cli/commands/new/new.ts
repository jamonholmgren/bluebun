import { type Props, progressStart, progressUpdate, progressEnd, print, colors } from "bluebun"
import { getName } from "./_getName"

export default {
  name: "new",
  description: "Spins up a new Bluebun project",
  alias: "n",
  run: async (props: Props) => {
    const [green, gray] = colors("green", "gray")

    // Ask for the project name if it wasn't given
    const projectName = await getName(props.first)

    print(`\nCreating new project: ${projectName}`)
    progressStart({ length: 40, bar: green("▣"), empty: gray("⬚") })

    await new Promise((r) => setTimeout(r, 1000))
    progressUpdate(0.3)

    await new Promise((r) => setTimeout(r, 3000))
    progressUpdate(0.5)

    await new Promise((r) => setTimeout(r, 3000))
    progressUpdate(0.7)

    await new Promise((r) => setTimeout(r, 2000))
    progressUpdate(1.0)
    await new Promise((r) => setTimeout(r, 1000))
    progressEnd()

    print("")
  },
}
