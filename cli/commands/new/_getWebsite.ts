import { ask, bold, yellow } from "bluebun"

export async function getWebsite(website: string | undefined) {
  if (website) return website

  return ask(bold("What is the project website?"), {
    validation: (input) => input.length > 0 || yellow("Please enter a website"),
    after: "clear",
    inputColor: "blue",
  })
}
