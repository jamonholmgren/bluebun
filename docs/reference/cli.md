## cli command

The [run](./run.md) command is mostly a convenience function wrapped around the `cli` command. You can also run the `cli` command directly, if you want to.

To learn more about the `cli` command, see the [run](./run.md) page -- the main difference is that instead of running it immediately, like the `run` command does, the `cli` command passes back the command and props so you can do something with them.

```ts
#!/usr/bin/env bun

const { command, props } = require("blowgun").cli({ name: "pizza", cliPath: __dirname + "/cli" })

// the `run` comand does this immediately
command(props)
```

This is useful if you want to do something with the `command` function or props before you run it. It's also useful for testing your CLI.

But most of the time, you won't need to do this. Just use the `run` command.

## Testing

To test your CLI end-to-end, you can just import the `cli` function and call it directly:

```ts
import { cli, type InitialProps } from "blowgun"
import { expect, test } from "bun:test"

test("pizza version", async () => {
  const argv = ["/bin/node", "/bin/pizza", "version"]
  const options: InitialProps = { name: "pizza", argv, cliPath: __dirname + "/../cli" }
  const { command, props } = await cli(options)

  expect(props.commandPath).toEqual(["version"])
  expect(props.arguments).toEqual([])
  expect(props.options).toEqual({})
  expect(command.name).toEqual("version")
})
```
