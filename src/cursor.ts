import { type CursorPos } from "bluebun"
import { write } from "./print"

// ty https://github.com/sindresorhus/ansi-escapes/blob/main/index.js
// const ESC = "\x1b["
const ESC = "\u001B["
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
  enterAlternativeScreen: "?1049h",
  exitAlternativeScreen: "?1049l",
  savePosition: isTerminalApp ? "\u001B7" : ESC + "s",
  restorePosition: isTerminalApp ? "\u001B8" : ESC + "u",
  goToPosition: (cols: number, rows: number) => `\u001b[${rows};${cols}H`,
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
  write: (s: string) => c(s, ""),
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
  goto: (pos: CursorPos) => c(cursorCodes.goToPosition(pos.cols, pos.rows), ""),

  // basic save & restore position
  savePosition: () => c(`${cursorCodes.savePosition}`, ""),
  restorePosition: () => c(`${cursorCodes.restorePosition}`, ""),

  hide: () => c(`${cursorCodes.hide}`),
  show: () => c(`${cursorCodes.show}`),

  backspace: (count = 1) => cursor.back(count).erase(count),

  alternate: (enabled: boolean) =>
    c(`${enabled ? cursorCodes.enterAlternativeScreen : cursorCodes.exitAlternativeScreen}`),

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
    const pos = positions[name]
    if (!pos) throw new Error(`No cursor bookmark found with name ${name}`)
    cursor.goto(pos)
    return cursor
  },
}

// this is how we use the ansi queryPosition escape code.
// it returns the cursor position, which we can then parse
// and use to position the cursor.
// ty https://github.com/bubkoo/get-cursor-position/blob/master/index.js
export function queryPosition(): Promise<CursorPos> {
  const code = "\u001B[6n"

  return new Promise((resolve) => {
    process.stdin.resume()
    process.stdin.setRawMode(true)

    const listener = (data: Buffer) => {
      var match = /\[(\d+)\;(\d+)R$/.exec(data.toString())
      if (match) {
        var position = match.slice(1, 3).reverse().map(Number)

        // cleanup and close stdin
        process.stdin.setRawMode(false)
        process.stdin.pause()

        // remove when we change to .once
        process.stdin.removeListener("data", listener)

        setTimeout(() => resolve({ rows: position[1], cols: position[0] }), 0)
      }
    }

    // TODO: change to .once when this issue is fixed:
    // https://github.com/oven-sh/bun/issues/6279
    process.stdin.on("data", listener)

    process.stdout.write(code)
  })
}
