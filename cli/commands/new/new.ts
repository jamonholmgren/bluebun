import { type Props, print, blue, cursor, inputKeys } from "bluebun"
import { getName } from "./_getName"
import { getAuthorName } from "./_getAuthorName"
import { getAuthorEmail } from "./_getAuthorEmail"
import { getDescription } from "./_getDescription"
import { getWebsite } from "./_getWebsite"
import { getColor } from "./_getColor"

export default {
  name: "new",
  description: "Spins up a new Bluebun project",
  alias: "n",
  run: async (props: Props) => {
    print(``)
    print(blue(`Let's create a new Bluebun-powered CLI!`))
    print(``)

    // Save the cursor position so we can return to it later
    await cursor.bookmark("start")

    const projectInfo = {
      name: "",
      description: "",
      authorName: "",
      authorEmail: "",
      website: "",
      primary: "",
      secondary: "",
    }

    // Build a display with all the options the user has chosen
    function displayOptions() {
      cursor.hide().jump("start")
      cursor.write(`·········································································\n`)
      cursor.write(`· Project name:      ${blue(projectInfo.name.padEnd(50))} ·\n`)
      cursor.write(`· Author name:       ${blue(projectInfo.authorName.padEnd(50))} ·\n`)
      cursor.write(`· Author email:      ${blue(projectInfo.authorEmail.padEnd(50))} ·\n`)
      cursor.write(`· Description:       ${blue(projectInfo.description.padEnd(50))} ·\n`)
      cursor.write(`· Website:           ${blue(projectInfo.website.padEnd(50))} ·\n`)
      cursor.write(`· Primary color:     ${blue(projectInfo.primary.padEnd(50))} ·\n`)
      cursor.write(`· Secondary color:   ${blue(projectInfo.secondary.padEnd(50))} ·\n`)
      cursor.write(`·········································································\n`)
      cursor.write(`\n`)
      cursor.show()
    }

    displayOptions()
    projectInfo.name = await getName(props.first)
    // displayOptions()
    // projectInfo.authorName = await getAuthorName(props.options.author as string | undefined)
    // displayOptions()
    // projectInfo.authorEmail = await getAuthorEmail(props.options.email as string | undefined)
    // displayOptions()
    // projectInfo.description = await getDescription(props.options.description as string | undefined)
    // displayOptions()
    // projectInfo.website = await getWebsite(props.options.website as string | undefined)
    // displayOptions()
    // projectInfo.primary = (await getColor(props.options.primary as string | undefined, "primary")) || "white"
    // displayOptions()
    // projectInfo.secondary = (await getColor(props.options.secondary as string | undefined, "secondary")) || "white"
    // displayOptions()
  },
}
