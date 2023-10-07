import { ask, yellow, bold } from "blowgun"

export async function getAuthorName(name: string | undefined) {
  if (name) return name

  return ask(bold("What is your name?"), {
    validation: (input) => input.length > 0 || yellow("Please enter your name"),
    after: "clear",
    inputColor: "blue",
  })
}
