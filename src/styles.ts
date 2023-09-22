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
