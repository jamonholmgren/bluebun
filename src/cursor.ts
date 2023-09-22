import { write } from "./print"

/**
 * The ANSI escape sequences.
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
  up: (count: number = 1) => c(`\u001b[${count}${cursorCodes.up}`),
  down: (count: number = 1) => c(`\u001b[${count}${cursorCodes.down}`),
  forward: (count: number = 1) => c(`\u001b[${count}${cursorCodes.forward}`),
  back: (count: number = 1) => c(`\u001b[${count}${cursorCodes.back}`),
  moveDown: (count: number = 1) => c(`\u001b[${count}${cursorCodes.nextLine}`),
  moveUp: (count: number = 1) => c(`\u001b[${count}${cursorCodes.previousLine}`),
  horizontalAbsolute: (count: number = 1) => c(`\u001b[${count}${cursorCodes.horizontalAbsolute}`),
  eraseBefore: (count: number = 1) => c(`\u001b[${count}${cursorCodes.eraseData}`),
  eraseLine: (count: number = 1) => c(`\u001b[${count}${cursorCodes.eraseLine}`),
  erase: (count: number = 1) => c(`\u001b[${count}${cursorCodes.eraseCharacter}`),
  clearScreen: () => c(`\u001b[${cursorCodes.clearScreen}`),
  scrollUp: (count: number = 1) => c(`\u001b[${count}${cursorCodes.scrollUp}`),
  scrollDown: (count: number = 1) => c(`\u001b[${count}${cursorCodes.scrollDown}`),
  savePosition: () => c(`\u001b[${cursorCodes.savePosition}`),
  restorePosition: () => c(`\u001b[${cursorCodes.restorePosition}`),
  queryPosition: () => c(`\u001b[${cursorCodes.queryPosition}`),
  hide: () => c(`\u001b[${cursorCodes.hide}`),
  show: () => c(`\u001b[${cursorCodes.show}`),
}
