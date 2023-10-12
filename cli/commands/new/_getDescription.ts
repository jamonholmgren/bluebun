import { ask, bold, yellow } from "bluebun"

export async function getDescription(description: string | undefined) {
  if (description) return description

  return ask(bold("What's your project description?"), {
    validation: (input) => input.length > 0 || yellow("Please enter a description"),
    after: "clear",
    inputColor: "blue",
  })
}
