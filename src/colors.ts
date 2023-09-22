/**
 * The ANSI escape sequences.
 */
const cursorCodes = {
  up: "A",
  down: "B",
  forward: "C",
  back: "D",
  nextLine: "E",
  previousLine: "F",
  horizontalAbsolute: "G",
  eraseData: "J",
  eraseLine: "K",
  scrollUp: "S",
  scrollDown: "T",
  savePosition: "s",
  restorePosition: "u",
  queryPosition: "6n",
  hide: "?25l",
  show: "?25h",
}

const styles = {
  bold: 1,
  italic: 3,
  underline: 4,
  inverse: 7,
}

const reset = {
  bold: 22,
  italic: 23,
  underline: 24,
  inverse: 27,
}

const colors = {
  white: 37,
  black: 30,
  blue: 34,
  cyan: 36,
  green: 32,
  magenta: 35,
  red: 31,
  yellow: 33,
  grey: 90,
  brightBlack: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97,
}

const resetColor = "\u001b[0m"

export const color = (color: keyof typeof colors) => (text: string) => {
  // reset color will always actually reset to this color
  const newText = text.replace(resetColor, `\u001b[${colors[color]}m`)
  return `\u001b[${colors[color]}m${text}${resetColor}`
}

export const style = (style: keyof typeof styles) => (text: string) => {
  return `\u001b[${styles[style]}m${text}\u001b[${reset[style]}m`
}

/**
 * This doesn't seem to work. Needs some testing/research.
 */
export const cursor = {
  up: (count: number) => `\u001b[${count}${cursorCodes.up}`,
  down: (count: number) => `\u001b[${count}${cursorCodes.down}`,
  forward: (count: number) => `\u001b[${count}${cursorCodes.forward}`,
  back: (count: number) => `\u001b[${count}${cursorCodes.back}`,
  nextLine: (count: number) => `\u001b[${count}${cursorCodes.nextLine}`,
  previousLine: (count: number) => `\u001b[${count}${cursorCodes.previousLine}`,
  horizontalAbsolute: (count: number) => `\u001b[${count}${cursorCodes.horizontalAbsolute}`,
  eraseData: (count: number) => `\u001b[${count}${cursorCodes.eraseData}`,
  eraseLine: (count: number) => `\u001b[${count}${cursorCodes.eraseLine}`,
  scrollUp: (count: number) => `\u001b[${count}${cursorCodes.scrollUp}`,
  scrollDown: (count: number) => `\u001b[${count}${cursorCodes.scrollDown}`,
  savePosition: () => `\u001b[${cursorCodes.savePosition}`,
  restorePosition: () => `\u001b[${cursorCodes.restorePosition}`,
  queryPosition: () => `\u001b[${cursorCodes.queryPosition}`,
  hide: () => `\u001b[${cursorCodes.hide}`,
  show: () => `\u001b[${cursorCodes.show}`,
}
