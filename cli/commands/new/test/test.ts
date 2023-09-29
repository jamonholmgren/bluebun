import { Props, print } from "bluebun"

export default {
  name: "test",
  description: "Just a test",
  alias: ["t", "testing"],
  run: async (props: Props) => {
    print(`Just testing.`)
  },
}
