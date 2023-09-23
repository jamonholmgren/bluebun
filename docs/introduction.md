# Introduction to Bluebun

Bluebun is a CLI framework inspired by [Gluegun](https://github.com/infinitered/gluegun), but specifically designed to be used with [Bun](https://bun.sh), the new JS runtime.

## Why Bun?

Bun is an incredibly fast JS runtime. It's essentially a Node competitor.

If you want to support Node, you can always use the delightful Gluegun instead! Gluegun comes with a ton of useful tools and patterns for making CLIs and is battle-tested.

Bluebun, on the other hand, is designed to be extremely fast and no-dependencies and ONLY work with Bun. You'll run your CLI with `bunx` rather than `npx`, for example, and we rely on Bun APIs and have rewritten all the important parts of Gluegun from scratch for speed and lightweightness.

## Getting Started

Bluebun has a CLI (of course) to help you get started building your own CLI.

```
# install/update bun
curl -fsSL https://bun.sh/install | bash

# use bluebun's CLI to create your new CLI
bunx bluebun new pizza # doesn't work yet!

# cd in and link it so you can run it
cd pizza
bun link
```

Bluebun will then **(EVENTUALLY -- when done!)** spin up a new CLI project for you, and you can start building your CLI right away.

## Comparison to other CLI frameworks

Generally speaking, other options are either too slow, too complex, have too many dependencies, or lack the basic feature set that Bluebun has.

**Gluegun:** [Gluegun](https://github.com/infinitered/gluegun) is a great CLI framework, but it's designed to work with Node and has a ton of dependencies. It has file-based command routing, like Bluebun. The API is a bit more complex than we'd like due to relying on so many dependencies. Bluebun is designed to be a simpler, faster, no-dependencies alternative to Gluegun.

**Oclif:** [Oclif](https://oclif.io/) is a popular CLI framework. It's also designed to work with Node and is quite a bit slower than Bluebun, and has many dependencies, including Yeoman.

**Commander:** [Commander.js](https://github.com/tj/commander.js) is a very popular and lightweight Node CLI library. It has no dependencies, but also lacks most of the features that Bluebun and Gluegun have. For example, there's no built-in template system, no built-in prompts, etc. It's just a very simple command router. You end up having to bring your own dependencies for most things.

**Caporal:** [Caporal](https://caporal.io/) is another Node option. It also has lots of dependencies, including Inquirer. It's a bit more complex than Commander, but has a lot more features. It's also slower than Bluebun, like all of these other options.

**Yeoman:** [Yeoman](https://yeoman.io/) is a scaffolding tool. It's not a CLI framework, but it's often used to scaffold projects. It's quite a bit more complex than Bluebun, and has a lot of dependencies, including Lodash, Inquirer, and Chalk. It's also slower than Bluebun.

## Limitations and Caveats

- It's under heavy construction, so tons of stuff doesn't work right now and the API is unstable
- We will not support Node (ever)
- We will not support Windows (until Bun does, and then we'll consider it)
- We won't support Gluegun-style plugins

Next: [Usage Guide](usage-guide.md)
