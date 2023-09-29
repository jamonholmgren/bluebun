import { cursor } from "./cursor"
import { print } from "./print"

// ty https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json
const dots = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

let spinner: Timer | undefined = undefined
let spinnerText: string = ""
let i = 0

/**
 * Start a spinner. Returns a Timer object that can be used to stop the spinner.
 */
export function spinStart(text: string) {
  if (spinner) clearInterval(spinner)

  // add spaces to new text if the new text is shorter
  spinnerText = text + " ".repeat(Math.max(0, spinnerText.length - text.length))

  cursor.hide()

  spinner = setInterval(() => {
    cursor.back(spinnerText.length + 2).write(dots[i++ % dots.length] + " " + spinnerText)
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

  if (spinner) {
    clearInterval(spinner)
    spinner = undefined

    cursor.eraseLine().backToStart()
  }

  if (text) print(mark + " " + text)

  cursor.show()
}
