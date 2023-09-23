# ask

This is a terminal prompt that asks the user a question and returns the answer.

It's a single line and will return when the user hits enter.

## Usage

```typescript
import { ask } from "bluebun"

const answer = await ask("What is your name?")
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
