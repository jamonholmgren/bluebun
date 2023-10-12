# Reference

Bluebun comes with a number of built-in utilities that are useful for most CLIs. They're all exported from `bluebun` directly, so you can import them like this:

```typescript
import { inputKey } from "bluebun"
```

Each of the following docs has usage examples and a Testing section that gives examples on how to write tests for them.

## CLI

- [run](./reference/run.md) - run the CLI and command
- [cli](./reference/cli.md) - start the CLI without running the command
- [commandHelp](./reference/commandHelp.md) - get a list of all commands and their descriptions

## User Interaction

- [ask](./reference/ask.md) - ask the user a question via a prompt
- [cursor](./reference/cursor.md) - manipulate the cursor
- [inputKey](./reference/inputKey.md) - wait for a single keypress
- [inputKeys](./reference/inputKeys.md) - wait for and handle multiple keypresses

## Output

- [print](./reference/print.md) - print a string to the terminal
- [spinner](./reference/spinner.md) - start and stop a spinner
- [progress](./reference/progress.md) - start, update, and stop a progress bar
- [styles and colors](./reference/styles.md) - style and colorize text
