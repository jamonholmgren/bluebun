# Command Help

While you often want to build your own help screens, Bluebun ships with an easy way to get all the commands and
their descriptions and formats it nicely.

```ts
import { print, commandHelp } from "bluebun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (props) => {
    print(commandHelp(props))
  },
}
```

This is an example of the output:

```sh
Commands:

  bluebun               Default command
  bluebun help          Prints this help message
  bluebun new           Spins up a new Bluebun project
  bluebun testing       Just a test
  bluebun testing cli   Testing the CLI
  bluebun testing other Testing something else
  bluebun version       Prints the CLI version
```

## Testing

commandHelp just returns a string, so it's relatively easy to test:

```ts
import { expect, test } from "bun:test"
import { commandHelp } from "bluebun"

test("commandHelp", async () => {
  const help = await commandHelp({ name: "bluebun", cliPath: __dirname + "/../cli" })

  const strippedText = stripANSI(help)

  expect(help).toContain("bluebun")
  expect(help).toContain("Spins up a new Bluebun project")
  expect(help).toContain("Prints the CLI version")
})
```

Just keep in mind we add some default colors to the output, so you might need to strip those out before testing.

## Custom Help

If you want to build your own help from the command tree, you can use the `commandTree` function to get an object with all the commands and their subcommands as an optional `.subcommands` property::

```ts
import { print, commandTree } from "bluebun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (props) => {
    const commands = await commandTree(props)

    // commands looks like this:
    // {
    //   default: {
    //     name: "bluebun",
    //     description: "Default command",
    //     run: [Function: run],
    //   },
    //   help: {
    //     name: "help",
    //     description: "Prints this help message",
    //     run: [Function: run],
    //     subcommands: {
    //        something: {
    //          name: "something",
    //          description: "Something",
    //          run: [Function: run],
    //        },
    //     }
    //   },
    //   // etc...
    // }

    print("Commands:\n")
    Object.keys(commands).forEach((name) => {
      const command = commands[name]

      print(`  ${name}`)
      if (command.description) print(`    ${command.description}`)

      if (command.subcommands) {
        Object.keys(command.subcommands).forEach((subName) => {
          const subCommand = command.subcommands[subName]

          print(`    ${subName}`)
          if (subCommand.description) print(`      ${subCommand.description}`)
        })
      }
    })
  },
}
```
