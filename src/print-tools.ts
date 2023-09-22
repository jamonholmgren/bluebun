export type PrintFunction = {
  (...opts: any[]): void
  setTesting: (testing: boolean) => void
  testing?: boolean
  testOutput?: string
}

export const print: PrintFunction = (...opts: any[]) => {
  if (print.testing) {
    print.testOutput += opts.join(" ") + "\n"
  } else {
    console.log(...opts)
  }
}

print.setTesting = (testing: boolean) => {
  print.testing = testing
  if (testing) print.testOutput = ""
}
