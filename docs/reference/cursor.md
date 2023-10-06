# Cursor

Blowgun comes with a simple cursor API that lets you move the cursor around the terminal. You can "chain"
commands, which makes for a really nice API.

This is not usually used directly in your CLI, but is used by other Blowgun APIs, like [spinners](./spinner.md).
However, if you want to use it directly, you can!

## Usage

```typescript
import { cursor } from "blowgun"

cursor.hide()
cursor.up(2).left(5).write("Hello!").down(2).right(5).show()
```

## Methods

- `write(text)` - write a string to the terminal
- `up(n)` - move the cursor up
- `down(n)` - move the cursor down
- `forward(n)` - move the cursor forward
- `back(n)` - move the cursor back
- `moveDown(n)` - move the cursor down
- `moveUp(n)` - move the cursor up
- `backToStart()` - move the cursor back to the start of the line
- `horizontalAbsolute(n)` - move the cursor to a specific column
- `eraseBefore(n)` - erase text before the cursor
- `eraseLine(n)` - erase the current line
- `erase(n)` - erase text for n characters
- `clearScreen()` - clear the screen
- `scrollUp(n)` - scroll up
- `scrollDown(n)` - scroll down
- `savePosition()` - save the cursor position
- `restorePosition()` - restore the cursor position
- `queryPosition()` - query the cursor position
- `hide()` - hide the cursor
- `show()` - show the cursor
- `backspace()` - move the cursor back and erase the character

## Testing

We don't currently have a recommended way to test cursor movement.
