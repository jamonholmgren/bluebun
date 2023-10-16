import { replace } from "./utils"

export const ESC = "\u001B[" as const

export const styleStart = <Sty extends number>(style: Sty) => `${ESC}${style}` as const
export const styleEnd = <Res extends number>(reset: Res) => `${ESC}${reset}` as const

export const style =
  <Sty extends number, Res extends number>(style: Sty, reset: Res) =>
  <Txt extends string>(text: Txt) => {
    return `${styleStart(style)}${text}${styleEnd(reset)}` as const
  }

export const bold = style(1, 22)
export const italic = style(3, 23)
export const underline = style(4, 24)
export const inverse = style(7, 27)
export const strikethrough = style(9, 29)

export const colorStart = <Col extends number>(color: Col) => `${ESC}${color}m` as const

export const colorEnd = `${ESC}39m` as const
export const bgColorEnd = `${ESC}49m` as const

export const color = <Col extends number>(col: Col) => {
  const startCode = colorStart(col)
  const endCode = colorEnd

  return <Txt extends string>(text: Txt) => {
    const newText = replace(text, endCode, startCode)
    return `${startCode}${newText}${endCode}` as const
  }
}

export const bgColor = <Col extends number>(col: Col) => {
  const startCode = colorStart(col)
  const endCode = bgColorEnd

  return <Txt extends string>(text: Txt) => {
    const newText = replace(text, endCode, startCode)
    return `${startCode}${newText}${endCode}` as const
  }
}

export const hexToRgb = <Hex extends string>(hex: Hex) => {
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & (255 as const)
  const g = (bigint >> 8) & (255 as const)
  const b = bigint & (255 as const)

  return [r, g, b] as const
}

export const colorHex = <Hex extends string>(hex: Hex) => {
  // convert hex to rbg to ansi (strip any # prefix)
  return colorRGB(...hexToRgb(hex.replace("#", "")))
}

export const colorHexStart = <Hex extends string>(hex: Hex) => {
  const [r, g, b] = hexToRgb(replace(hex, "#", ""))
  return colorRGBStart(r, g, b)
}

export const bgColorHex = <Hex extends string>(hex: Hex) => {
  const [r, g, b] = hexToRgb(replace(hex, "#", ""))
  return bgColorRGB(r, g, b)
}

export const bgColorHexStart = <Hex extends string>(hex: Hex) => {
  const [r, g, b] = hexToRgb(replace(hex, "#", ""))
  return bgColorRGBStart(r, g, b)
}

export const colorRGBStart = <R extends number, G extends number, B extends number>(r: R, g: G, b: B) =>
  `${ESC}38;2;${r};${g};${b}m` as const

// returns escape codes wrapped around text for a given rgb color
export const colorRGB = <R extends number, G extends number, B extends number>(r: R, g: G, b: B) => {
  const startCode = colorRGBStart(r, g, b)
  return <Txt extends string>(text: Txt) => {
    // first replace any existing reset color with this color
    const newText = replace(text, colorEnd, startCode)
    return `${startCode}${newText}${colorEnd}` as const
  }
}

export const bgColorRGBStart = <R extends number, G extends number, B extends number>(r: R, g: G, b: B) =>
  `${ESC}48;2;${r};${g};${b}m` as const

export const bgColorRGB = <R extends number, G extends number, B extends number>(r: R, g: G, b: B) => {
  const startCode = bgColorRGBStart(r, g, b)
  return <Txt extends string>(text: Txt) => {
    // first replace any existing reset color with this color
    const newText = replace(text, bgColorEnd, startCode)
    return `${startCode}${newText}${bgColorEnd}` as const
  }
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

  bgWhite: 47,
  bgBlack: 40,
  bgBlue: 44,
  bgCyan: 46,
  bgGreen: 42,
  bgMagenta: 45,
  bgRed: 41,
  bgYellow: 43,
  bgGrey: 100,
  bgGray: 100,
  bgBrightBlack: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107,
} as const

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

export const bgWhite = color(ansiColors.bgWhite)
export const bgBlack = color(ansiColors.bgBlack)
export const bgBlue = color(ansiColors.bgBlue)
export const bgCyan = color(ansiColors.bgCyan)
export const bgGreen = color(ansiColors.bgGreen)
export const bgMagenta = color(ansiColors.bgMagenta)
export const bgRed = color(ansiColors.bgRed)
export const bgYellow = color(ansiColors.bgYellow)
export const bgGrey = color(ansiColors.bgGrey)
export const bgGray = color(ansiColors.bgGray)
export const bgBrightBlack = color(ansiColors.bgBrightBlack)
export const bgBrightRed = color(ansiColors.bgBrightRed)
export const bgBrightGreen = color(ansiColors.bgBrightGreen)
export const bgBrightYellow = color(ansiColors.bgBrightYellow)
export const bgBrightBlue = color(ansiColors.bgBrightBlue)
export const bgBrightMagenta = color(ansiColors.bgBrightMagenta)
export const bgBrightCyan = color(ansiColors.bgBrightCyan)
export const bgBrightWhite = color(ansiColors.bgBrightWhite)
