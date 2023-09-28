import { ask, color } from "bluebun"

export async function getName(name: string | undefined) {
  if (name) return name

  const yellow = color("yellow")

  return ask("Name of your cli? (e.g. 'pizza-cli')", {
    validation: (input) => input.length > 0 || yellow("Please enter a project name"),
  })
}
