import { Props, commandHelp, print } from "bluebun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (props: Props) => {
    print("")
    const helpText = await commandHelp(props)
    print(helpText)
    print("")
    print("For more information, visit bluebun.jamon.dev")
    print("")
  },
}
