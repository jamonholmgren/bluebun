import { bold, cursor, delay, inputKey } from "./blowgun"
import * as readline from "node:readline/promises"

type ChooseOptions = {
  style: "horizontal" | "vertical"
  after?: "show-choice" | "preserve" | "clear"
}

export async function choose(
  selections: string[],
  options: ChooseOptions = { style: "vertical", after: "show-choice" }
) {
  let currentSelection = selections[0]

  // await cursor.bookmark("cstart")

  const clearChoices = () => {
    cursor.jump("ask-start")

    // clear the selections
    selections.forEach((selection) => {
      cursor.write(`  ${" ".repeat(selection.length)}`)
      if (options.style === "horizontal") {
        cursor.write(" ")
      } else {
        cursor.write("\n")
      }
    })
  }

  const printChoices = () => {
    // go to the top
    cursor.jump("ask-start")

    // Print the selections
    selections.forEach((selection) => {
      if (selection === currentSelection) {
        cursor.write(`▣ ${bold(selection)}`)
      } else {
        cursor.write(`⬚ ${selection}`)
      }
      if (options.style === "horizontal") {
        cursor.write(" ")
      } else {
        cursor.write("\n")
      }
    })
  }

  while (true) {
    cursor.hide()

    printChoices()

    // wait for the user to press a key
    const key = await inputKey()

    switch (key) {
      case "up":
        const ci = selections.indexOf(currentSelection)
        const ni = ci === 0 ? selections.length - 1 : ci - 1
        currentSelection = selections[ni]
        break
      case "down":
        const ci2 = selections.indexOf(currentSelection)
        const ni2 = ci2 === selections.length - 1 ? 0 : ci2 + 1
        currentSelection = selections[ni2]
        break
      case "enter":
        if (options.after === "show-choice") {
          clearChoices()
          cursor.write(`▣ ${currentSelection}\n`)
        } else if (options.after === "clear") {
          clearChoices()
        }
        cursor.jump("ask-start").show()
        cursor.show()
        return currentSelection
      case "escape":
        if (options.after === "show-choice") {
          clearChoices()
          cursor.write(`▣ ${currentSelection}\n`)
        } else if (options.after === "clear") {
          clearChoices()
        }
        cursor.show()
        return undefined
      case "ctrl-c":
        process.exit(1)
    }
  }
}
