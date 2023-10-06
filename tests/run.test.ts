import { run, print, type InitialProps } from "blowgun"
import { expect, test } from "bun:test"

test("blowgun version", async () => {
  print.setMocked(true)
  const argv = ["/bin/bun", "/bin/blowgun", "version"]
  const options: InitialProps = { name: "pizza", argv, cliPath: __dirname + "/../cli" }
  await run(options)
  // read the version from package.json
  const pkg = await Bun.file(__dirname + "/../package.json").json()
  expect(pkg.version).toInclude(".") // should be a version number
  expect(print.testOutput).toContain(pkg.version)
  print.setMocked(false)
})

test("blowgun help", async () => {
  print.setMocked(true)
  const argv = ["/bin/bun", "/bin/blowgun", "help"]
  const options: InitialProps = { name: "blowgun", argv, cliPath: __dirname + "/../cli" }
  await run(options)
  expect(print.testOutput).toContain(`Commands:`)
  print.setMocked(false)
})
