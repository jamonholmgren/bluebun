import { expect, test, beforeEach, afterEach } from "bun:test"
import { color, colorRGB, colorHex, bgColor, bgColorRGB, bgColorHex } from "bluebun"

test("color", () => {
  // normal colors
  expect(color(32)("Hello")).toBe("\u001B[32mHello\u001B[39m")
  expect(color(33)("Hello")).toBe("\u001B[33mHello\u001B[39m")

  // background
  expect(bgColor(42)("Hello")).toBe("\u001B[42mHello\u001B[49m")
})

test("nested colors", () => {
  const red = color(31)
  const green = color(32)
  expect(red("Hello, " + green("World") + "!")).toBe("\u001B[31mHello, \u001B[32mWorld\u001B[31m!\u001B[39m")
})

test("nested colors with backgrounds", () => {
  const red = color(31)
  const bgGreen = bgColor(42)
  expect(red("Hello, " + bgGreen("World") + "!")).toBe("\u001B[31mHello, \u001B[42mWorld\u001B[49m!\u001B[39m")
})

test("nested background colors", () => {
  const bgRed = bgColor(41)
  const bgGreen = bgColor(42)
  expect(bgRed("Hello, " + bgGreen("World") + "!")).toBe("\u001B[41mHello, \u001B[42mWorld\u001B[41m!\u001B[49m")
})

test("colorRGB", () => {
  expect(colorRGB(255, 0, 0)("Hello")).toBe("\u001B[38;2;255;0;0mHello\u001B[39m")
  expect(colorRGB(0, 255, 0)("Hello")).toBe("\u001B[38;2;0;255;0mHello\u001B[39m")
  expect(colorRGB(0, 0, 255)("Hello")).toBe("\u001B[38;2;0;0;255mHello\u001B[39m")
})

test("colorHex", () => {
  expect(colorHex("#ff1100")("Hello")).toBe("\u001B[38;2;255;17;0mHello\u001B[39m")
  expect(colorHex("#00ff00")("Hello")).toBe("\u001B[38;2;0;255;0mHello\u001B[39m")
  expect(colorHex("#0000ff")("Hello")).toBe("\u001B[38;2;0;0;255mHello\u001B[39m")
  expect(colorHex("#eeeeee")("Hello")).toBe("\u001B[38;2;238;238;238mHello\u001B[39m")
})

test("bgColorRGB", () => {
  expect(bgColorRGB(255, 0, 0)("Hello")).toBe("\u001B[48;2;255;0;0mHello\u001B[49m")
  expect(bgColorRGB(0, 255, 0)("Hello")).toBe("\u001B[48;2;0;255;0mHello\u001B[49m")
  expect(bgColorRGB(0, 0, 255)("Hello")).toBe("\u001B[48;2;0;0;255mHello\u001B[49m")
})

test("bgColorHex", () => {
  expect(bgColorHex("#ff1100")("Hello")).toBe("\u001B[48;2;255;17;0mHello\u001B[49m")
  expect(bgColorHex("#00ff00")("Hello")).toBe("\u001B[48;2;0;255;0mHello\u001B[49m")
  expect(bgColorHex("#0000ff")("Hello")).toBe("\u001B[48;2;0;0;255mHello\u001B[49m")
  expect(bgColorHex("#eeeeee")("Hello")).toBe("\u001B[48;2;238;238;238mHello\u001B[49m")
})
