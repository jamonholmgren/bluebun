# inputKey

This waits for a single keypress by the user and returns the result as a string.

If it's a special key, like an arrow key, it will return a string like `up` | `left` | `down` | `right`. Not all special keys are currently implemented; if you need more, please create a PR to the `./src/special-keys.ts` file. Also look at that file for the current list of special keys.

_If you need to handle multiple keypresses, use the [`inputKeys`](./inputKeys.md) function instead._

## Usage

```typescript
import { inputKey } from "blowgun"

const key = await inputKey()
```

## Testing

You can set a mock function on the `inputKey` function to provide a character to return rather than waiting for user input.

```typescript
import { expect, test } from "bun:test"
import { inputKey } from "blowgun"

test("inputKey", async () => {
  inputKey.mock = async () => "a"

  const key = await inputKey()
  expect(key).toBe("a")

  inputKey.mock = undefined
})
```
