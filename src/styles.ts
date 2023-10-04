const ESC = "\u001B["

export const styleStart = (style: number) => `${ESC}${style}m`
export const styleEnd = (reset: number) => `${ESC}${reset}m`

export const style = (style: number, reset: number) => (text: string) => {
  return `${styleStart(style)}${text}${styleEnd(reset)}`
}

export const bold = style(1, 22)
export const italic = style(3, 23)
export const underline = style(4, 24)
export const inverse = style(7, 27)

export const colorEnd = `${ESC}0m`

export const colorStart = (color: number) => `${ESC}${color}m`

export const color = (color: number) => (text: string) => {
  // reset color will always actually reset to this color
  const newText = text.replace(colorEnd, `${ESC}${color}m`)
  return `${colorStart(color)}${newText}${colorEnd}`
}

export const ansiColors = {
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

export const white = color(ansiColors.white)
export const black = color(ansiColors.black)
export const blue = color(ansiColors.blue)
export const cyan = color(ansiColors.cyan)
export const green = color(ansiColors.green)
export const magenta = color(ansiColors.magenta)
export const red = color(ansiColors.red)
export const yellow = color(ansiColors.yellow)
export const grey = color(ansiColors.grey)
export const gray = color(ansiColors.gray)
export const brightBlack = color(ansiColors.brightBlack)
export const brightRed = color(ansiColors.brightRed)
export const brightGreen = color(ansiColors.brightGreen)
export const brightYellow = color(ansiColors.brightYellow)
export const brightBlue = color(ansiColors.brightBlue)
export const brightMagenta = color(ansiColors.brightMagenta)
export const brightCyan = color(ansiColors.brightCyan)
export const brightWhite = color(ansiColors.brightWhite)
