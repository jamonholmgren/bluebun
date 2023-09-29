import { write } from "./print"

// ty https://github.com/sindresorhus/ansi-escapes/blob/main/index.js
const ESC = "\u001B["
const isTerminalApp = process.env.TERM_PROGRAM === "Apple_Terminal"

/**
 * ANSI escape sequences.
 */
export const cursorCodes = {
  up: ESC + "A",
  down: ESC + "B",
  forward: ESC + "C",
  back: ESC + "D",
  nextLine: ESC + "E",
  previousLine: ESC + "F",
  horizontalAbsolute: ESC + "G",
  eraseData: ESC + "J",
  eraseLine: ESC + "K",
  eraseCharacter: ESC + "X",
  clearScreen: ESC + "2J",
  scrollUp: ESC + "S",
  scrollDown: ESC + "T",
  savePosition: isTerminalApp ? "\u001B7" : ESC + "s",
  restorePosition: isTerminalApp ? "\u001B8" : ESC + "u",
  queryPosition: ESC + "6n",
  hide: ESC + "?25l",
  show: ESC + "?25h",
}

/**
 * For chaining cursor methods.
 */
const c = (s: string) => {
  write(s)
  return cursor
}

/**
 * Moving the cursor around the terminal. Needs testing on Windows.
 */
export const cursor = {
  write: (s: string) => c(s),
  up: (count = 1) => c(`${count}${cursorCodes.up}`),
  down: (count = 1) => c(`${count}${cursorCodes.down}`),
  forward: (count = 1) => c(`${count}${cursorCodes.forward}`),
  back: (count = 1) => c(`${count}${cursorCodes.back}`),
  moveDown: (count = 1) => c(`${count}${cursorCodes.nextLine}`),
  moveUp: (count = 1) => c(`${count}${cursorCodes.previousLine}`),
  backToStart: () => c(`${cursorCodes.horizontalAbsolute}`),
  horizontalAbsolute: (count = 1) => c(`${count}${cursorCodes.horizontalAbsolute}`),
  eraseBefore: (count = 1) => c(`${count}${cursorCodes.eraseData}`),
  eraseLine: (count = 1) => c(`${count}${cursorCodes.eraseLine}`),
  erase: (count = 1) => c(`${count}${cursorCodes.eraseCharacter}`),
  clearScreen: () => c(`${cursorCodes.clearScreen}`),
  scrollUp: (count = 1) => c(`${count}${cursorCodes.scrollUp}`),
  scrollDown: (count = 1) => c(`${count}${cursorCodes.scrollDown}`),
  savePosition: () => c(`${cursorCodes.savePosition}`),
  restorePosition: () => c(`${cursorCodes.restorePosition}`),
  queryPosition: () => c(`${cursorCodes.queryPosition}`),
  hide: () => c(`${cursorCodes.hide}`),
  show: () => c(`${cursorCodes.show}`),

  backspace: () => cursor.back(1).erase(1),
}
