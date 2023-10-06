# Usage Guide

This is a fairly comprehensive guide on how I use Blowgun to build CLIs. It doesn't cover
_everything_ that Blowgun does, but after reading through this you should have a pretty
solid understanding of how to use Blowgun.

Make sure you've done the [Getting Started](./getting-started.md) guide first, as that covers
installation and spinning up the CLI we are about to build.

For the purposes of this guide, we'll be building a CLI called `pizza`.

## Binary

There's a file in the root of your new project, called `pizza`. It should look like this:

```js
#!/usr/bin/env bun

// Start blowgun to run the correct CLI command
require("blowgun").run({
  name: require("./package.json").name,
  cliPath: __dirname + "/cli",
})
```

First, I always replace the `require("./package.json").name` with a string, so that it isn't reading
from disk every time. This speeds up startup time a bit.

So, the file should look like this:

```js
#!/usr/bin/env bun

require("blowgun").run({ name: "pizza", cliPath: __dirname + "/cli" })
```

Ready to roll!

## Default Command

The first thing I work on is the default command. This runs when you just run `pizza` OR if you run `pizza some nonexistant commands` (it falls back to this).

This is always named the same as your CLI. So, in this case, it's `cli/commands/pizza.ts`.

Now I have to decide -- what do I want this command to do? I usually make it display a cool ASCII art logo, and then show some help.

If I want, I'll sometimes look at the `first` parameter to see if they passed in a subcommand, and if so, I'll let them know that's not a recognized command.

So, let's do that.

```ts
import { type Props, print, color } from "blowgun"

export default {
  name: "pizza",
  description: "The best CLI ever",
  run: async (props: Props) => {
    const { first } = props
    const [orange, cyan] = colors("orange", "cyan")

    print("")
    print("🍕🍕🍕🍕 Pizza! 🍕🍕🍕🍕")
    print("")
    print(orange("Welcome to the pizza CLI!"))
    print("")
    print("To get started, run:")
    print("")
    print("  pizza help")
    print("")

    if (first) {
      print(`I don't know what "pizza ${cyan(first)}" is. Try "pizza help"`)
    }
  },
}
```

The default exported object has a `name` (which should always match the filename), a `description`, and an async `run` function.

It can also have an `alias` property that can either be a string or an array of strings. It's used to alias commands; for example, if you have a command called `bake` with an alias `b`, then `pizza b` will run the `bake` command.

If you're familiar with React, the `props` object works kind of the same way. It's an object with a bunch of properties that are passed in to the command when it runs. We're only using the `first` positional argument here, so we destructure it.

To explain further how the props work, check the [`Commands`](./commands.md) docs.

So, now we have a default command that displays a cool logo and some help.

## TODO: Continue this usage guide.
