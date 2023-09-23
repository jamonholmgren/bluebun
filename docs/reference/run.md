# run

Bluebun's main function is just called `run`. It's usually run from the CLI binary and from tests.

```ts
#!/usr/bin/env bun

// Start bluebun to run the correct CLI command
require("bluebun").run({ path: __dirname + "/cli" })
```

## Options

The `run` function takes an options object with the following keys:

- `path`: The path to the CLI directory. This is a required option, because we can't infer it. Highly recommended to use `__dirname + "/cli"` for this value -- relative paths are not supported!
- `name`: The name of the CLI. This is optional, and defaults to the name of the package (from `package.json`). Providing it can speed up startup time since we won't have to read from package.json.
