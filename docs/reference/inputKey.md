# inputKey

This waits for a single keypress by the user and returns the result as a string.

## Usage

```typescript
import { inputKey } from "bluebun"

const key = await inputKey()
```

## Testing

You can set a mock function on the `inputKey` function to provide a character to return rather than waiting for user input.

```typescript
import { expect, test } from "bun:test"
import { inputKey } from "bluebun"

test("inputKey", async () => {
  inputKey.mock = async () => "a"

  const key = await inputKey()
  expect(key).toBe("a")

  inputKey.mock = undefined
})
```
