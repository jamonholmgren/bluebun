# Command Help

While you often want to build your own help screens, Blowgun ships with an easy way to get all the commands and
their descriptions and formats it nicely.

```ts
import { print, commandHelp } from "blowgun"

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

  blowgun               Default command
  blowgun help          Prints this help message
  blowgun new           Spins up a new Blowgun project
  blowgun testing       Just a test
  blowgun testing cli   Testing the CLI
  blowgun testing other Testing something else
  blowgun version       Prints the CLI version
```

## Testing

commandHelp just returns a string, so it's relatively easy to test:

```ts
import { expect, test } from "bun:test"
import { commandHelp } from "blowgun"

test("commandHelp", async () => {
  const help = await commandHelp({ name: "blowgun", cliPath: __dirname + "/../cli" })

  const strippedText = stripANSI(help)

  expect(help).toContain("blowgun")
  expect(help).toContain("Spins up a new Blowgun project")
  expect(help).toContain("Prints the CLI version")
})
```

Just keep in mind we add some default colors to the output, so you might need to strip those out before testing.

## Custom Help

If you want to build your own help from the command tree, you can use the `commandTree` function to get an object with all the commands and their subcommands as an optional `.subcommands` property::

```ts
import { print, commandTree } from "blowgun"

export default {
  name: "help",
  description: "Prints this help message",
  run: async (props) => {
    const commands = await commandTree(props)

    // commands looks like this:
    // {
    //   default: {
    //     name: "blowgun",
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
