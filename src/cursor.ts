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
} as const

/**
 * Moving the cursor around the terminal. Needs testing on Windows.
 */
export class Cursor {
  bookmarks: { [key: string]: CursorPos } = {}

  // for chaining easily
  c(s: string, esc: string = ESC) {
    write(esc + s)
    return this
  }

  write(s: string) {
    return this.c(s, "")
  }
  up(count: number = 1) {
    return this.c(`${count}${cursorCodes.up}`)
  }
  down(count: number = 1) {
    return this.c(`${count}${cursorCodes.down}`)
  }
  forward(count: number = 1) {
    return this.c(`${count}${cursorCodes.forward}`)
  }
  back(count: number = 1) {
    return this.c(`${count}${cursorCodes.back}`)
  }
  moveDown(count: number = 1) {
    return this.c(`${count}${cursorCodes.nextLine}`)
  }
  moveUp(count: number = 1) {
    return this.c(`${count}${cursorCodes.previousLine}`)
  }
  backToStart() {
    return this.c(`${cursorCodes.horizontalAbsolute}`)
  }
  horizontalAbsolute(count = 1) {
    return this.c(`${count}${cursorCodes.horizontalAbsolute}`)
  }
  eraseBefore(count = 1) {
    return this.c(`${count}${cursorCodes.eraseData}`)
  }
  eraseLine() {
    return this.c(`${cursorCodes.eraseLine}`)
  }
  erase(count = 1) {
    return this.c(`${count}${cursorCodes.eraseCharacter}`)
  }
  clearScreen() {
    return this.c(`${cursorCodes.clearScreen}`)
  }
  scrollUp(count = 1) {
    return this.c(`${count}${cursorCodes.scrollUp}`)
  }
  scrollDown(count = 1) {
    return this.c(`${count}${cursorCodes.scrollDown}`)
  }
  goto(pos: CursorPos) {
    return this.c(cursorCodes.goToPosition(pos.cols, pos.rows), "")
  }

  // basic save & restore position
  savePosition() {
    return this.c(`${cursorCodes.savePosition}`, "")
  }
  restorePosition() {
    return this.c(`${cursorCodes.restorePosition}`, "")
  }

  hide() {
    return this.c(`${cursorCodes.hide}`)
  }
  show() {
    return this.c(`${cursorCodes.show}`)
  }

  backspace(count = 1) {
    return this.back(count).erase(count)
  }

  alternate(enabled: boolean) {
    return this.c(`${enabled ? cursorCodes.enterAlternativeScreen : cursorCodes.exitAlternativeScreen}`)
  }

  // advanced save & restore bookmarks -- these can't be chained
  queryPosition() {
    return queryPosition()
  }
  async bookmark(name: string, pos?: CursorPos) {
    const cpos = pos || (await queryPosition())
    this.bookmarks[name] = cpos
    return cpos
  }

  // can be chained, since we don't have to wait for the queryPosition
  jump(name: string) {
    const pos = this.bookmarks[name]
    if (!pos) throw new Error(`No cursor bookmark found with name ${name}`)
    return this.goto(pos)
  }
}

export const cursor = new Cursor()

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
