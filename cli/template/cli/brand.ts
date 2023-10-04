import { Props, print, bold, THEME_PRIMARY, THEME_SECONDARY, commandHelp } from "bluebun"

export default {
  name: "BRAND",
  description: "DESCRIPTION",
  run: async (props: Props) => {
    const version = require(props.cliPath + "/../package.json").version

    print(``)
    print(THEME_PRIMARY(bold(`BRAND CLI`)))
    print(``)
    print(THEME_SECONDARY(` ${`version ` + version} • by ${bold(`AUTHOR_NAME`)} • ${THEME_PRIMARY(`WEBSITE`)}`))
    print(``)
    print(await commandHelp(props))
  },
}
