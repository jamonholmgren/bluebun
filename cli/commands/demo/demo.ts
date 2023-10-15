import {
  cursor,
  inputKey,
  print,
  colorRGB,
  type Props,
  colorHex,
  bgColorRGB,
  bgColorHex,
  white,
  red,
  yellow,
} from "bluebun"

export default {
  name: "demo",
  description: "Lets you test various features of Bluebun.",
  run: async (props: Props) => {
    print(``)
    print(`Try "bluebun demo cursor".`)
    print(``)

    const gptGreen = colorHex("#74a899")
    const bgGreen = bgColorHex("#74a899")

    print(gptGreen("Hello!"))
    print(white(bgGreen("there!")))
    print(yellow(`Hey ${red("you")}! I ${bgGreen("like")} ${gptGreen("you")}!`))
  },
}
