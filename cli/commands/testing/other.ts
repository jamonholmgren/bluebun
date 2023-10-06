import { Props, print } from "blowgun"

export default {
  name: "other",
  alias: "o",
  description: "Just a test -- other",
  run: async (props: Props) => {
    print(`Just testing other.`)
  },
}
