# Usage Guide

This lays out how to use Bluebun in your CLI at a high level. It assumes you've already [spun up a Bluebun CLI project](./introduction.md) using our CLI.

## Your CLI's binary

For the rest of this document, we'll assume your CLI is called `pizza`. Just replace "pizza" with whatever name you chose when you made your CLI.

So, when you run `bunx pizza`, the file that is run is `pizza` in the root of your project. (This is specified in the package.json file, under the `bin` key.)

This is very simple -- it just calls the `run()` function that is exported from `bluebun`, and passes in a few standard arguments:

```js
#!/usr/bin/env bun

// Start bluebun to run the correct CLI command
require("bluebun").run({
  name: require("./package.json").name,
  path: __dirname + "/cli",
})
```

While you _could_ put more logic in this file, we don't recommend it. Instead, you should put your logic in the `cli` directory under the correct command.

_(Note: if you replace the `require("./package.json").name` with a simple string with the name, you can speed up startup time a bit, since we won't have to read from package.json.)_

## The CLI directory

By convention, Bluebun expects your CLI source to be in a directory called `cli` in the root of your project (but you can configure it above).

### Commands

Inside the `cli` directory, you'll have a directory called `commands`. Inside this directory, you'll have a file for each command you want to run, and folders for nested commands.

The root (bare) command is just called the same as your CLI (we infer this from the package.json "name" field).

So, if your CLI is called `pizza`, then the root command is in `cli/commands/pizza.ts`.

This command is run anytime you run `pizza` (or `bunx pizza`), and it is also run if you run `pizza something else` when there is no command called `something` or `something/else`. It's the default command, essentially.
