import { write } from "./print"

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
  eraseLine: "K",
  eraseCharacter: "X",
  clearScreen: "2J",
  scrollUp: "S",
  scrollDown: "T",
  savePosition: "s",
  restorePosition: "u",
  queryPosition: "6n",
  hide: "?25l",
  show: "?25h",
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
  up: (count = 1) => c(`\u001b[${count}${cursorCodes.up}`),
  down: (count = 1) => c(`\u001b[${count}${cursorCodes.down}`),
  forward: (count = 1) => c(`\u001b[${count}${cursorCodes.forward}`),
  back: (count = 1) => c(`\u001b[${count}${cursorCodes.back}`),
  moveDown: (count = 1) => c(`\u001b[${count}${cursorCodes.nextLine}`),
  moveUp: (count = 1) => c(`\u001b[${count}${cursorCodes.previousLine}`),
  backToStart: () => c(`\u001b[${cursorCodes.horizontalAbsolute}`),
  horizontalAbsolute: (count = 1) => c(`\u001b[${count}${cursorCodes.horizontalAbsolute}`),
  eraseBefore: (count = 1) => c(`\u001b[${count}${cursorCodes.eraseData}`),
  eraseLine: (count = 1) => c(`\u001b[${count}${cursorCodes.eraseLine}`),
  erase: (count = 1) => c(`\u001b[${count}${cursorCodes.eraseCharacter}`),
  clearScreen: () => c(`\u001b[${cursorCodes.clearScreen}`),
  scrollUp: (count = 1) => c(`\u001b[${count}${cursorCodes.scrollUp}`),
  scrollDown: (count = 1) => c(`\u001b[${count}${cursorCodes.scrollDown}`),
  savePosition: () => c(`\u001b[${cursorCodes.savePosition}`),
  restorePosition: () => c(`\u001b[${cursorCodes.restorePosition}`),
  queryPosition: () => c(`\u001b[${cursorCodes.queryPosition}`),
  hide: () => c(`\u001b[${cursorCodes.hide}`),
  show: () => c(`\u001b[${cursorCodes.show}`),

  backspace: () => cursor.back(1).erase(1),
}
