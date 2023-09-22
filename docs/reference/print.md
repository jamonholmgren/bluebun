# print

This will print the message in the terminal, along with a newline.

## Usage

```typescript
import { print } from "butterbun"

print("Hello, Butterbun!")
```

## Testing

You can set a mock flag on the `print` function to store output in `testOutput` rather than printing it to the terminal.

```typescript
import { expect, test, beforeEach, afterEach } from "bun:test"
import { print } from "butterbun"

beforeEach(() => {
  print.setMocked(true)
})

afterEach(() => {
  print.setMocked(false)
})

test("print", () => {
  print("Hello, world!")
  expect(print.testOutput).toBe("Hello, w2orld!\n")
})
```
