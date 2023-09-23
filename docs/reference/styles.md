# Styles and Colors

This lets you output text in different colors and styles in the terminal using ANSI escape codes.

## Usage

```typescript
import { print, color, style } from "bluebun"

const red = color("red")
const bold = style("bold")

print(red(`This is ${bold("red")} text`))
```

## Available Styles and Colors

Easiest way to see all the styles and colors is to just look at the [source file](https://github.com/jamonholmgren/bluebun/blob/main/src/styles.ts). The TypeScript definitions are also helpful here.

## Custom Styles

Just output the ANSI escape code directly:

```typescript
import { print } from "bluebun"

print("\x1b[38;2;255;0;0mThis is red text\x1b[0m")
```

## Testing

If you're using the `print` function, you can mock it (see the [print docs](./print.md)) and then test that the correct ANSI escape codes are being output.

But, generally speaking, the easiest way to test this is to just run your CLI and visually inspect the output.
