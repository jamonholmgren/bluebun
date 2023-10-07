import { type Props, print, blue, cursor, inputKeys, billboard, gray, white, bold, ask } from "blowgun"
import { getName } from "./_getName"
import { getAuthorName } from "./_getAuthorName"
import { getAuthorEmail } from "./_getAuthorEmail"
import { getDescription } from "./_getDescription"
import { getWebsite } from "./_getWebsite"
import { getColor } from "./_getColor"

export default {
  name: "new",
  description: "Spins up a new Blowgun project",
  alias: "n",
  run: async (props: Props) => {
    print(``)
    print(blue(`Let's create a new Blowgun-powered CLI!`))
    print(``)

    // Save the cursor position so we can return to it later
    const startPos = await cursor.bookmark("start")

    const projectInfo = {
      name: "",
      description: "",
      authorName: "",
      authorEmail: "",
      website: "",
      primary: "",
      secondary: "",
    }

    const updater = billboard(
      `
        •••••••••••••••••••••••••••••••••••••••••••••••••••••
        •                                                   •
        •   {t}           {v}                               •
        •                                                   •
        •   Project name:    {n}                            •
        •   Author name:     {a}                            •
        •   Author email:    {e}                            •
        •   Description:     {d}                            •
        •   Website:         {w}                            •
        •   Primary color:   {p}                            •
        •   Secondary color: {s}                            •
        •                                                   •
        •••••••••••••••••••••••••••••••••••••••••••••••••••••
    `,
      startPos
    )

    updater("t", bold(white("Blowgun")))
    const version = await import(`${props.cliPath}/../package.json`).then((pkg) => pkg.version)
    updater("v", version)

    cursor.goToPosition(startPos.cols + 20, startPos.rows + 4)

    // get input
    const input = await ask("", {
      after: "clear",
      inputColor: "blue",
      validation: (input) => input.length > 0 || white("Please enter a project name"),
    })

    process.exit(1)

    projectInfo.name = await getName(props.first)
    updater("n", blue(projectInfo.name))
    projectInfo.authorName = await getAuthorName(props.options.author as string | undefined)
    updater("a", blue(projectInfo.authorName))
    projectInfo.authorEmail = await getAuthorEmail(props.options.email as string | undefined)
    updater("e", blue(projectInfo.authorEmail))
    projectInfo.description = await getDescription(props.options.description as string | undefined)
    updater("d", blue(projectInfo.description))
    projectInfo.website = await getWebsite(props.options.website as string | undefined)
    updater("w", blue(projectInfo.website))

    projectInfo.primary = (await getColor(props.options.primary as string | undefined, "primary")) || "white"
    updater("p", blue(projectInfo.primary))
    projectInfo.secondary = (await getColor(props.options.secondary as string | undefined, "secondary")) || "white"
    updater("s", blue(projectInfo.secondary))
  },
}
