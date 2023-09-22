export type PrintFunction = {
  (...opts: any[]): void
  setTesting: (testing: boolean) => void
  testing?: boolean
  testOutput?: string
}

export const print: PrintFunction = (output: string) => {
  if (print.testing) {
    print.testOutput += output + "\n"
  } else {
    write(output + "\n")
  }
}

print.setTesting = (testing: boolean) => {
  print.testing = testing
  if (testing) print.testOutput = ""
}

export const write = (text: string): void => process.stdout.write(text)
