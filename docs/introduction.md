# Introduction to Blowgun

Blowgun is a CLI framework inspired by [Gluegun](https://github.com/infinitered/gluegun), but specifically designed to be used with [Bun](https://bun.sh), the new JS runtime.

## Why Bun?

Bun is an incredibly fast JS runtime. It's essentially a Node competitor.

If you want to support Node, you can always use the delightful Gluegun instead! Gluegun comes with a ton of useful tools and patterns for making CLIs and is battle-tested.

Blowgun, on the other hand, is designed to be extremely fast and no-dependencies and ONLY work with Bun. You'll run your CLI with `bunx` rather than `npx`, for example, and we rely on Bun APIs and have rewritten all the important parts of Gluegun from scratch for speed and lightweightness.

## Comparison to other CLI frameworks

Generally speaking, other options are either too slow, too complex, have too many dependencies, or lack the basic feature set that Blowgun has.

**Gluegun:** [Gluegun](https://github.com/infinitered/gluegun) is a great CLI framework, but it's designed to work with Node and has a ton of dependencies. It has file-based command routing, like Blowgun. The API is a bit more complex than we'd like due to relying on so many dependencies. Blowgun is designed to be a simpler, faster, no-dependencies alternative to Gluegun.

**Oclif:** [Oclif](https://oclif.io/) is a popular CLI framework. It's also designed to work with Node and is quite a bit slower than Blowgun, and has many dependencies, including Yeoman.

**Commander:** [Commander.js](https://github.com/tj/commander.js) is a very popular and lightweight Node CLI library. It has no dependencies, but also lacks most of the features that Blowgun and Gluegun have. For example, there's no built-in template system, no built-in prompts, etc. It's just a very simple command router. You end up having to bring your own dependencies for most things.

**Caporal:** [Caporal](https://caporal.io/) is another Node option. It also has lots of dependencies, including Inquirer. It's a bit more complex than Commander, but has a lot more features. It's also slower than Blowgun, like all of these other options.

**Yeoman:** [Yeoman](https://yeoman.io/) is a scaffolding tool. It's not a CLI framework, but it's often used to scaffold projects. It's quite a bit more complex than Blowgun, and has a lot of dependencies, including Lodash, Inquirer, and Chalk. It's also slower than Blowgun.

## Limitations and Caveats

- It's under heavy construction, so tons of stuff doesn't work right now and the API is very unstable, changing every release
- We will not support Node (until Bun releases `node-bun`, and then we'll consider it)
- We will not support Windows (until Bun does, and then we'll consider it)
- We don't currently plan to support Gluegun-style plugins (although this may change)

Next: [Getting Started](getting-started.md)
