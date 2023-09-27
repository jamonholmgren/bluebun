import { Props, print } from "bluebun"

export default {
  name: "version",
  description: "Prints the CLI version",
  run: async (props: Props) => {
    const version = (await import(props.cliOptions.path + "/../package.json")).version

    print(version)
  },
}
