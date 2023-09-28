import { run, print, type InitialProps } from "bluebun"
import { expect, test } from "bun:test"

test("bluebun version", async () => {
  print.setMocked(true)
  const argv = ["/bin/bun", "/bin/bluebun", "version"]
  const options: InitialProps = { name: "pizza", argv, cliPath: __dirname + "/../cli" }
  await run(options)
  // read the version from package.json
  const pkg = await Bun.file(__dirname + "/../package.json").json()
  expect(pkg.version).toInclude(".") // should be a version number
  expect(print.testOutput).toContain(pkg.version)
  print.setMocked(false)
})

test("bluebun help", async () => {
  print.setMocked(true)
  const argv = ["/bin/bun", "/bin/bluebun", "help"]
  const options: InitialProps = { name: "bluebun", argv, cliPath: __dirname + "/../cli" }
  await run(options)
  expect(print.testOutput).toContain(`Commands:`)
  print.setMocked(false)
})
