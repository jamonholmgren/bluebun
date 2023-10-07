import { type CursorPos } from "readline"
import { cursor } from "./cursor"
import { stripANSI } from "./utils"

type Updater = (k: string, newValue: string) => void

type Element = {
  key: string
  pos: CursorPos
  value: string
}

/**
 * This prints a billboard with continually updating information (text).
 *
 * Provide it with a string and it'll respond back with an updater function
 * that lets you update any of the elements.
 *
 * You can designate an element with a 1-letter code wrapped in curly braces,
 * like `{a}` or `{b}`.
 *
 * Minimum length of reactive text is 3 characters.
 *
 * pos is a `{ rows: number, cols: number }` object that tells the billboard
 * where to start printing. It can be offset from the left side of the screen.
 */
export function billboard(text: string, pos: CursorPos): Updater {
  const reactiveElements: Element[] = []

  text.split("\n").forEach((line, rowIndex) => {
    // find any reactive elements as an array
    const rowElements = line.match(/\{[a-z]\}/g) || []

    // add them to the list
    rowElements.forEach((el) => {
      const colIndex = line.indexOf(el)

      reactiveElements.push({
        key: el.replace(/\{|\}/g, ""),
        pos: { rows: pos.rows + rowIndex, cols: pos.cols + colIndex },
        value: "",
      })
    })

    // print out the row at the right spot, removing the reactive elements
    // console.log(line.replace(/\{[a-z]\}/g, "   "))
    cursor.goToPosition(pos.cols, pos.rows + rowIndex).write(line.replace(/\{[a-z]\}/g, "   ") + "\n")
    // console.log(pos.cols, pos.rows + rowIndex)
  })

  function updateFn(key: string, newValue: string): void {
    // find the reactive element
    const reactiveElement = reactiveElements.find((el) => el.key === `${key}`)

    if (!reactiveElement) return

    // find previous value length
    const previousValueLength = stripANSI(reactiveElement.value).length
    reactiveElement.value = newValue
    cursor
      .savePosition()
      .goToPosition(reactiveElement.pos.cols, reactiveElement.pos.rows)
      .write(newValue.padEnd(previousValueLength, " "))
      .restorePosition()
  }

  return updateFn
}
