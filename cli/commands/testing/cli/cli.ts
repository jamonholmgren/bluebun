import { Props, print } from "blowgun"

export default {
  name: "cli",
  description: "Just a test -- cli",
  run: async (props: Props) => {
    print(`Just testing cli.`)
  },
}
