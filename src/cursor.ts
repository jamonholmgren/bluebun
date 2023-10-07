import { type ReadStream } from "tty"
import { write } from "./print"
import { CursorPos } from "readline"

// ty https://github.com/sindresorhus/ansi-escapes/blob/main/index.js
const ESC = "\u001b["
const isTerminalApp = process.env.TERM_PROGRAM === "Apple_Terminal"

/**
 * ANSI escape sequences.
 */
export const cursorCodes = {
  up: "A",
  down: "B",
  forward: "C",
  back: "D",
  nextLine: "E",
  previousLine: "F",
  horizontalAbsolute: "G",
  eraseData: "J",
  eraseAfter: "0K",
  eraseBefore: "1K",
  eraseLine: "2K",
  eraseCharacter: "X",
  clearScreen: "2J",
  scrollUp: "S",
  scrollDown: "T",
  savePosition: isTerminalApp ? "\u001B7" : ESC + "s",
  restorePosition: isTerminalApp ? "\u001B8" : ESC + "u",
  goToPosition: (x: number, y: number) => `\u001b[${y};${x}H`,
  // goToPosition: (cols: number, rows: number) => `goto: ${cols}, ${rows}\n`,
  hide: "?25l",
  show: "?25h",
}

/**
 * For storing bookmarks
 */
const positions: { [key: string]: CursorPos } = {}

/**
 * For chaining cursor methods.
 */
const c = (s: string, esc: string = ESC) => {
  write(esc + s)
  return cursor
}

/**
 * Moving the cursor around the terminal. Needs testing on Windows.
 */
export const cursor = {
  write: (s: string) => c(s),
  up: (count: number = 1) => c(`${count}${cursorCodes.up}`),
  down: (count: number = 1) => c(`${count}${cursorCodes.down}`),
  forward: (count: number = 1) => c(`${count}${cursorCodes.forward}`),
  back: (count: number = 1) => c(`${count}${cursorCodes.back}`),
  moveDown: (count: number = 1) => c(`${count}${cursorCodes.nextLine}`),
  moveUp: (count: number = 1) => c(`${count}${cursorCodes.previousLine}`),
  backToStart: () => c(`${cursorCodes.horizontalAbsolute}`),
  horizontalAbsolute: (count = 1) => c(`${count}${cursorCodes.horizontalAbsolute}`),
  eraseBefore: (count = 1) => c(`${count}${cursorCodes.eraseData}`),
  eraseLine: () => c(`${cursorCodes.eraseLine}`),
  erase: (count = 1) => c(`${count}${cursorCodes.eraseCharacter}`),
  clearScreen: () => c(`${cursorCodes.clearScreen}`),
  scrollUp: (count = 1) => c(`${count}${cursorCodes.scrollUp}`),
  scrollDown: (count = 1) => c(`${count}${cursorCodes.scrollDown}`),
  goToPosition: (x: number, y: number) => c(cursorCodes.goToPosition(x, y), ""),

  // basic save & restore position
  savePosition: () => c(`${cursorCodes.savePosition}`, ""),
  restorePosition: () => c(`${cursorCodes.restorePosition}`, ""),

  hide: () => c(`${cursorCodes.hide}`),
  show: () => c(`${cursorCodes.show}`),

  backspace: (count = 1) => cursor.back(count).erase(count),

  // advanced save & restore positions -- these can't be chained
  queryPosition,
  bookmark: async (name: string, pos?: CursorPos) => {
    const cpos = pos || (await queryPosition())
    positions[name] = cpos
    return cpos
  },
  getBookmark: (name: string) => positions[name],

  // can be chained, since we don't have to wait for the queryPosition
  jump: (name: string) => {
    const cols = positions[name].cols || 1
    const rows = positions[name].rows || 1
    cursor.goToPosition(cols, rows)
    return cursor
  },
}

// this is how we use the ansi queryPosition escape code.
// it returns the cursor position, which we can then parse
// and use to position the cursor.
let stream: ReadStream | undefined
export function queryPosition(): Promise<CursorPos> {
  return new Promise((resolve, reject) => {
    const listener = (data: string) => {
      const str = data.toString()
      const match = str.match(/\d+/g)

      process.stdin.setRawMode(false)
      stream!.pause()

      if (!match || match.length !== 2) {
        reject(new Error("Could not get cursor position"))
      } else {
        const [rows, cols] = match.map((n) => parseInt(n, 10))
        // Seems to resolve this issue: https://github.com/oven-sh/bun/issues/6279
        setTimeout(() => resolve({ rows, cols }), 0)
      }
    }

    process.stdin.setRawMode(true)
    if (stream) {
      // stream.resume()
      stream.removeAllListeners("data")
      stream.on("data", listener)
    } else {
      stream = process.stdin.on("data", listener)
    }
    process.stdout.write("\u001B[6n")
  })
}
