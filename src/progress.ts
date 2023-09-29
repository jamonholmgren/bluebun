import { cursor } from "./cursor"

let progressValue: number = 0
let currentValue: number = 0
let timer: Timer | undefined = undefined
let maxLength: number = 0
let lastProgress: number = 0
let barChar: string = "▣"
let emptyChar: string = "⬚"

export function progressStart({ length = 40, startValue = 0, bar = "▣", empty = "⬚", fps = 30 }) {
  barChar = bar
  emptyChar = empty
  maxLength = length
  progressValue = startValue
  currentValue = 0
  lastProgress = -1

  cursor.hide()
  timer = setInterval(() => {
    const dir = Math.sign(progressValue - currentValue)
    currentValue += dir * 0.01
    // if within 0.02 of the target, then just set it to the target
    if (Math.abs(progressValue - currentValue) <= 0.02) currentValue = progressValue
    const progressLength = Math.floor(currentValue * maxLength)

    // don't write if we haven't changed progress length
    if (progressLength === lastProgress) return
    lastProgress = progressLength

    drawBar(progressLength)
  }, 1000 / fps)
}

export function progressUpdate(value: number) {
  progressValue = value
}

export function progressEnd(action: "fulfill" | "preserve" | "clear" = "fulfill") {
  clearInterval(timer)
  timer = undefined
  if (action === "clear") {
    cursor.savePosition().write(" ".repeat(maxLength)).restorePosition()
  } else {
    if (action === "fulfill") drawBar(Math.floor(progressValue * maxLength))
    cursor.write("\n")
  }
  cursor.show()
}

function drawBar(progressLength: number) {
  return cursor
    .savePosition()
    .write(barChar.repeat(Math.max(0, progressLength)))
    .write(emptyChar.repeat(Math.max(0, maxLength - progressLength)))
    .restorePosition()
}
