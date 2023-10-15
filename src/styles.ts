export const ESC = "\u001B["

export const styleStart = (style: number) => `${ESC}${style}`
export const styleEnd = (reset: number) => `${ESC}${reset}`

export const style = (style: number, reset: number) => (text: string) => {
  return `${styleStart(style)}${text}${styleEnd(reset)}`
}

export const bold = style(1, 22)
export const italic = style(3, 23)
export const underline = style(4, 24)
export const inverse = style(7, 27)

export const colorStart = (color: number) => `${ESC}${color}m`
export const bgColorStart = (color: number) => `${ESC}${color + 10}m`
export const colorEnd = `${ESC}39m`
export const bgColorEnd = `${ESC}49m`

export const color = (col: number, bg = false) => {
  const startCode = bg ? bgColorStart(col) : colorStart(col)
  const endCode = bg ? bgColorEnd : colorEnd

  return (text: string) => {
    const newText = text.replace(colorEnd, startCode)
    return `${startCode}${newText}${endCode}`
  }
}

export const bgColor = (col: number) => color(col, true)

export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return [r, g, b] as const
}

export const colorHex = (hex: string, bg = false) => {
  // convert hex to rbg to ansi (strip any # prefix)
  return colorRGB(...hexToRgb(hex.replace("#", "")), bg)
}

// returns escape codes wrapped around text for a given rgb color
export const colorRGB = (r: number, g: number, b: number, bg = false) => {
  const startCode = `${ESC}${bg ? 48 : 38};2;${r};${g};${b}m`
  const endCode = bg ? bgColorEnd : colorEnd
  return (text: string) => {
    // first replace any existing reset color with this color
    const newText = text.replace(colorEnd, startCode)
    return `${startCode}${newText}${endCode}`
  }
}

export const bgColorHex = (hex: string) => colorHex(hex, true)
export const bgColorRGB = (rgb: readonly [number, number, number]) => colorRGB(...rgb, true)

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

export const bgWhite = color(ansiColors.white + 10)
export const bgBlack = color(ansiColors.black + 10)
export const bgBlue = color(ansiColors.blue + 10)
export const bgCyan = color(ansiColors.cyan + 10)
export const bgGreen = color(ansiColors.green + 10)
export const bgMagenta = color(ansiColors.magenta + 10)
export const bgRed = color(ansiColors.red + 10)
export const bgYellow = color(ansiColors.yellow + 10)
export const bgGrey = color(ansiColors.grey + 10)
export const bgGray = color(ansiColors.gray + 10)
export const bgBrightBlack = color(ansiColors.brightBlack + 10)
export const bgBrightRed = color(ansiColors.brightRed + 10)
export const bgBrightGreen = color(ansiColors.brightGreen + 10)
export const bgBrightYellow = color(ansiColors.brightYellow + 10)
export const bgBrightBlue = color(ansiColors.brightBlue + 10)
export const bgBrightMagenta = color(ansiColors.brightMagenta + 10)
export const bgBrightCyan = color(ansiColors.brightCyan + 10)
export const bgBrightWhite = color(ansiColors.brightWhite + 10)
