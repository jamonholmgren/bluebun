# inputKeys

Waits for a series of keypresses by the user and gives you each one as it is pressed.

Just return `false` from your callback to exit the loop and and resume.

_If you need to wait for a single keypress, use the [`inputKey`](./inputKey.md) function instead._

## Usage

```typescript
import { inputKeys } from "bluebun"

const keysPressed = []
const keys = await inputKeys(async (key) => {
  if (key === "q") return false // `false` will exit the inputKeys loop
  keysPressed.push(key) // add to the array of keys pressed and keep listing for more
})
```
