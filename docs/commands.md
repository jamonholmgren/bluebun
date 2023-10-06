# Commands

Commands are the heart of your CLI. Every time the user runs your CLI, they'll be running a command.

## Command structure

Commands are organized in a tree structure. The root command is the name of your CLI, and then you can have subcommands under that, and subcommands under those, and so on.

For example, if your CLI is called `pizza`, then you might have a command structure like this:

```
cli/
  commands/
    pizza.ts        # pizza
    help.ts         # pizza help
    bake/
      bake.ts       # pizza bake
      cheese.ts     # pizza bake cheese
      pepperoni.ts  # pizza bake pepperoni
```

## Command files

Commands are exported as defaults from each command file. They look like this:

```typescript
import { type Props } from "blowgun"

export default {
  name: "bake",
  description: "Bake a pizza",
  alias: ["b"],
  run: async (props: Props) => {
    // bake it!
  },
}
```

## Command properties

Commands have the following properties:

- `name` - the name of the command
- `description` - a description of the command for the automatic help system
- `alias` - an array of aliases for the command (can also be a single string)
- `run` - the function that is run when the command is run, usually `async`

## Props

The `run` function is passed a `Props` object. This object contains the command path, the arguments, and the options, as well as a few other useful things.

Here are the properties available on the `props` object, assuming we have a CLI called `pizza` and we run `pizza bake cheese convection --sliced --temp=400 --time 30`:

- `name` - the name of the CLI (usually inferred from package.json)
- `cliPath` - the path to the CLI (usually inferred from package.json)
- `argv` - the raw arguments passed to the CLI (e.g. `["/usr/bun", "/usr/pizza", "bake", "cheese", "convection", "--sliced", "--temp=400", "--time", "30"]`)
- `commandPath` - the path to the command that was run (e.g. `["bake", "cheese"]`)
- `arguments` - the positional arguments passed to the command (e.g. `["convection"]`)
- `options` - the options passed to the command (e.g. `{ sliced: true, temp: 400, time: 30 }`)
- `first` - the first argument passed to the command (e.g. `"convection"`)
- `second` - the second argument passed to the command (e.g. `undefined`)
- `third` - the third argument passed to the command (e.g. `undefined`)

Given these props, we might have a command that looks like this:

```typescript
import { type Props, spinStart, spinStop } from "blowgun"
import { createPizza, slice } from "./_pizza"
import { convectionBake, toasterBake, regularBake } from "./_bakePizza"

export default {
  name: "bake",
  description: "Bake a pizza",
  alias: ["b"],
  run: async (props: Props) => {
    const { first, second, third, options } = props

    const pizza = createPizza()

    spinStart("Baking pizza...")
    if (first === "convection") {
      await convectionBake(pizza, options.temp, options.time)
    } else if (first === "toaster") {
      await toasterBake(pizza, options.temp, options.time)
    } else {
      await regularBake(pizza, options.temp, options.time)
    }
    spinStop("✅ Pizza baked!")

    spinStart("Slicing pizza...")
    if (options.sliced) {
      await slice(pizza)
    }
    spinStop("✅ Pizza sliced!")
  },
}
```

For a full list of all the features available to you from Blowgun, see the [Reference](./reference.md) page.

For a much more in-depth guide on how to use Blowgun, see the [Usage Guide](./usage-guide.md) page.
