import { Props, print } from "blowgun"

export default {
  name: "testing",
  description: "Just a test",
  alias: ["t", "woohoo"],
  run: async (props: Props) => {
    print(`Just testing.`)
  },
}
