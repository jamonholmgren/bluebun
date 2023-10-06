import { ask, yellow, bold } from "blowgun"

export async function getAuthorEmail(name: string | undefined) {
  if (name) return name

  return ask(bold("What is your public email?"), {
    validation: (input) => input.length > 0 || yellow("Please enter your email"),
    after: "clear",
    inputColor: "blue",
  })
}
