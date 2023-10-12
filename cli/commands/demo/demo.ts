import { cursor, inputKey, print, type Props } from "bluebun"

export default {
  name: "demo",
  description: "Lets you test various features of Bluebun.",
  run: async (props: Props) => {
    print(``)
    print(`Try "bluebun demo cursor".`)
    print(``)
  },
}
