# run

Bluebun's main function is just called `run`. It's usually run from the CLI binary and from tests.

```ts
#!/usr/bin/env bun

// Start bluebun to run the correct CLI command
require("bluebun").run({ path: __dirname + "/cli" })
```

## Options

The `run` function takes an options object with the following keys:

- `path`: The path to the CLI directory. This is a required option, because we can't infer it. Highly recommended to use `__dirname + "/cli"` for this value -- relative paths are not supported!
- `name`: The name of the CLI. This is optional, and defaults to the name of the package (from `package.json`). Providing it can speed up startup time since we won't have to read from package.json.

## Testing

To test your CLI end-to-end, you can just import the `run` function and call it directly:

```ts
import { run } from "bluebun"

run({ path: __dirname + "/../cli" })
```

We recommend mocking the print output and any input functions (see the [print docs](./print.md) and [inputKey docs](./inputKey.md) and [inputLoop docs](./inputLoop.md)).

```ts
import { run, print, inputKey, type InitialProps } from "bluebun"
import { expect, test } from "bun:test"

test("pizza version", async () => {
  print.setMocked(true)
  const argv = ["/bin/node", "/bin/pizza", "version"]
  const options: InitialProps = { name: "pizza", argv, cliPath: __dirname + "/../cli" }
  await run(options)
  expect(print.testOutput).toContain("0.0.1")
  print.setMocked(false)
})

test("pizza interactive", async () => {
  print.setMocked(true)
  inputKey.mock = async () => "a" // will type an "a" for any interactive keypress

  const argv = ["/bin/node", "/bin/pizza", "interactive"]
  const options: InitialProps = { name: "pizza", argv, cliPath: __dirname + "/../cli" }
  await run(options)
  expect(print.testOutput).toContain(`You chose: a`)

  print.setMocked(false)
  inputKey.mock = undefined
})
```
