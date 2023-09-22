# Introduction to Blowgun

_(Name still TBD -- we're open to suggestions! Just file an issue.)_

Blowgun is a CLI framework inspired by [Gluegun](https://github.com/infinitered/gluegun), but specifically designed to be used with [Bun](https://bun.sh), the new JS runtime.

## Why Bun?

Bun is an incredibly fast JS runtime. It's essentially a Node competitor.

If you want to support Node, you can always use the delightful Gluegun instead! Gluegun comes with a ton of useful tools and patterns for making CLIs and is battle-tested.

Blowgun, on the other hand, is designed to be extremely fast and no-dependencies and ONLY work with Bun. You'll run your CLI with `bunx` rather than `npx`, for example, and we rely on Bun APIs and have rewritten all the important parts of Gluegun from scratch for speed and lightweightness.

## Limitations and Caveats

- It's under heavy construction, so tons of stuff doesn't work right now and the API is unstable
- We will not support Node (ever)
- We will not support Windows (until Bun does, and then we'll consider it)

## Getting Started

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

Blowgun will then **(EVENTUALLY -- when done!)** spin up a new CLI project for you, and you can start building your CLI right away.

Next: [Usage Guide](usage-guide.md)
