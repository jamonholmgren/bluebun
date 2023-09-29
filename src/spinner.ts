import { cursor } from "./cursor"
import { print } from "./print"

// ty https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json
const dots = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

let spinner: Timer | undefined = undefined

/**
 * Start a spinner. Returns a Timer object that can be used to stop the spinner.
 */
export function spinStart(text: string) {
  cursor.hide()

  let i = 0
  spinner = setInterval(() => {
    cursor.back(text.length + 2).write(dots[i++ % dots.length] + " " + text)
  }, 80)

  return spinner
}

/**
 * Stop any currently spinning spinner. If no mark is provided, then a checkmark (✓) is used.
 */
export function spinStop(mark: string = "", text?: string) {
  // if no mark, then use a checkmark
  if (!text) {
    text = mark
    mark = "✓"
  }

  // No spinner, so just print the text
  if (!spinner) return print(mark + " " + text)

  clearInterval(spinner)
  spinner = undefined

  cursor.eraseLine().backToStart()

  if (text) print(mark + " " + text)

  cursor.show()
}
