import { Props, print } from "bluebun"

export default {
  name: "cli",
  description: "Just a test -- cli",
  run: async (props: Props) => {
    print(`Just testing cli.`)
  },
}
