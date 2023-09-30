const ESC = "\u001B["

const asciiStyles = {
  bold: 1,
  italic: 3,
  underline: 4,
  inverse: 7,
}

const asciiReset = {
  bold: 22,
  italic: 23,
  underline: 24,
  inverse: 27,
}

const asciiColors = {
  white: 37,
  black: 30,
  blue: 34,
  cyan: 36,
  green: 32,
  magenta: 35,
  red: 31,
  yellow: 33,
  grey: 90,
  gray: 90,
  brightBlack: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97,
}

const resetColor = `${ESC}0m`

export const color = (color: keyof typeof asciiColors) => (text: string) => {
  // reset color will always actually reset to this color
  const newText = text.replace(resetColor, `${ESC}${asciiColors[color]}m`)
  return `${ESC}${asciiColors[color]}m${newText}${resetColor}`
}

/**
 * // Returns multiple colors at once
 * // Usage:
 * const [red, blue, green] = colors("red", "blue", "green")
 */
export const colors = (...colors: (keyof typeof asciiColors)[]) => colors.map((c) => color(c))

export const style = (style: keyof typeof asciiStyles) => (text: string) => {
  return `${ESC}${asciiStyles[style]}m${text}${ESC}${asciiReset[style]}m`
}

/**
 * // Returns multiple styles at once
 * // Usage:
 * const [bold, italic, underline] = styles("bold", "italic", "underline")
 */
export const styles = (...styles: (keyof typeof asciiStyles)[]) => styles.map((s) => style(s))

/**
 * Lets you strip the above ansi codes from a string.
 * Useful for testing.
 */
export function stripANSI(str: string): string {
  return str.replace(/\u001B\[\d+m/g, "")
}
