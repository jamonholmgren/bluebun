import { ask, bold, yellow } from "bluebun"

export async function getName(name: string | undefined) {
  if (name) return name

  return ask(bold(`Name of your cli?`), {
    validation: (input) => input.length > 0 || yellow("Please enter a project name"),
    after: "clear",
  })
}
