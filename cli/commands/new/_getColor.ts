import {
  blue,
  bold,
  brightBlue,
  brightCyan,
  brightGreen,
  brightMagenta,
  brightRed,
  brightWhite,
  brightYellow,
  choose,
  cursor,
  cyan,
  gray,
  green,
  magenta,
  print,
  red,
  white,
  yellow,
} from "blowgun"

export async function getColor(name: string | undefined, colorName: "primary" | "secondary") {
  if (name) return name

  print(bold(`What ${colorName} color do you want?`))

  const answer = await choose(
    [
      white("white"),
      blue("blue"),
      cyan("cyan"),
      green("green"),
      magenta("magenta"),
      red("red"),
      yellow("yellow"),
      gray("gray"),
      brightRed("brightRed"),
      brightGreen("brightGreen"),
      brightYellow("brightYellow"),
      brightBlue("brightBlue"),
      brightMagenta("brightMagenta"),
      brightCyan("brightCyan"),
      brightWhite("brightWhite"),
    ],
    {
      style: "horizontal",
      after: "clear",
    }
  )

  return answer
}
