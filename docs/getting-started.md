# Getting Started

This lays out how to use Blowgun in your CLI at a high level.

## Quick Start

Blowgun has a CLI (of course) to help you get started building your own CLI.

```
# install/update bun
curl -fsSL https://bun.sh/install | bash

# use blowgun's CLI to create your new CLI
bunx blowgun new pizza # doesn't work yet!

# cd in and link it so you can run it
cd pizza
bun link
```

Blowgun will then spin up a new CLI project for you, and you can start building your CLI right away.

## Your CLI's binary

For the rest of this document, we'll assume your CLI is called `pizza`. Just replace "pizza" with whatever name you chose when you made your CLI.

So, when you run `bunx pizza`, the file that is run is `pizza` in the root of your project. (This is specified in the package.json file, under the `bin` key.)

This is very simple -- it just calls the `run()` function that is exported from `blowgun`, and passes in a few standard arguments:

```js
#!/usr/bin/env bun

// Start blowgun to run the correct CLI command
require("blowgun").run({
  name: require("./package.json").name,
  cliPath: __dirname + "/cli",
})
```

While you _could_ put more logic in this file, we don't recommend it. Instead, you should put your logic in the `cli` directory under the correct command.

_(Note: if you replace the `require("./package.json").name` with a simple string with the name, you can speed up startup time a bit, since we won't have to read from package.json.)_

## The CLI directory

By convention, Blowgun expects your CLI source to be in a directory called `cli` in the root of your project (but you can configure it above).

### Commands

Inside the `cli` directory, you'll have a directory called `commands`. Inside this directory, you'll have a file for each command you want to run, and folders for nested commands.

The root (bare) command is just called the same as your CLI (we infer this from the package.json "name" field).

So, if your CLI is called `pizza`, then the root command is in `cli/commands/pizza.ts`.

This command is run anytime you run `pizza` (or `bunx pizza`), and it is also run if you run `pizza something else` when there is no command called `something.ts` or `something/else.ts`. It's the default command, essentially.

Next, see the [Commands](./commands.md) page for more details on how to write commands.

Or, see the [Reference](./reference.md) page for all the available features.
