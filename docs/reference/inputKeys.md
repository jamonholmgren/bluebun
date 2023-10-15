# inputKeys

Waits for a series of keypresses by the user and gives you each one as it is pressed in a callback.

Just return anything except `undefined` from your callback to exit the loop and and resume. Whatever you return will be the return value of the `inputKeys` function.

_If you need to wait for a single keypress, use the [`inputKey`](./inputKey.md) function instead._

## Usage

```typescript
import { inputKeys } from "bluebun"

const keysPressed = []
await inputKeys(async (key) => {
  // returning anything except undefined will exit the loop and resume
  if (key === "q") return true

  // add to the array of keys pressed and keep listing for more
  keysPressed.push(key)
})
```

Another usage is when you're waiting for a specific key press.

```typescript
import { print, inputKeys } from "bluebun"

print("Are you sure? (y/n)")
const sure = await inputKeys(async (key) => {
  if (key === "y" || key === "n") return key
})
```

## Testing

There isn't a way to mock `inputKeys`, but since it uses `inputKey` under the hood, you can do this:

```typescript
import { expect, test } from "bun:test"
import { inputKeys, inputKey } from "bluebun"

test("inputKeys", async () => {
  const keys = ["a", "b", "c"]
  inputKey.mock = () => {
    const key = keys.shift()
    return key
  }

  const keysPressed = []
  await inputKeys(async (key) => {
    keysPressed.push(key)
  })

  expect(keysPressed).toEqual(["a", "b", "c"])

  inputKey.mock = undefined
})
```
