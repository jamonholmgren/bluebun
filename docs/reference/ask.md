# ask

This is a terminal prompt that asks the user a question and returns the answer.

It's a single line and will return when the user hits enter.

## Usage

```typescript
import { ask } from "bluebun"

const answer = await ask("What is your name?")
```

If you need validation for the answer, there are two ways to approach it.

You can use the `validate` option (recommended):

```typescript
import { ask, color } from "bluebun"

const warning = color("yellow")("At least 3 characters please")

const answer = await ask("What is your name?", {
  validate: (answer) => answer.length < 3 || warning,
})
```

Alternatively, you can just add a loop yourself:

```typescript
import { ask, print, color } from "bluebun"

const warning = color("yellow")("At least 3 characters please")

let answer = ""
while (answer.length < 3) {
  answer = await ask("What is your name?")
  if (answer.length < 3) print(warning)
}
```

## Testing

You can set a mock property on the `ask` function to return a value for a given input.

```typescript
import { expect, test, beforeAll, afterAll } from "bun:test"
import { ask } from "bluebun"

beforeAll(() => {
  ask.mock = (input) => {
    if (input.includes("name")) return "Jamon"
    if (input.includes("old")) return 41
  }
})

afterAll(() => {
  ask.mock = undefined
})

test("ask", () => {
  expect(await ask("What is your name?")).toBe("Jamon")
  expect(await ask("How old are you?")).toBe("41")
})
```
