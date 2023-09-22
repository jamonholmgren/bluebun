export type PrintFunction = {
  (...opts: any[]): void
  setMocked: (mocked: boolean) => void
  mocked?: boolean
  testOutput?: string
}

export const print: PrintFunction = (output: string) => {
  if (print.mocked) {
    print.testOutput += output + "\n"
  } else {
    write(output + "\n")
  }
}

print.setMocked = (mocked: boolean) => {
  print.mocked = mocked
  if (mocked) print.testOutput = ""
}

export const write = (text: string) => process.stdout.write(text)
