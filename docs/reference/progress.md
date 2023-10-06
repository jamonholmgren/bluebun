# Progress bar

Blowgun comes with a simple progress bar feature.

## `progressStart`

Starts a progress bar.

```ts
import { progressStart } from "blowgun"

progressStart()
```

This has a few options (shown with default values here):

```ts
progressStart({
  length = 40,
  startValue = 0,
  bar = "▣",
  empty = "⬚",
  fps = 30,
})
```

## `progressUpdate`

Updates the progress bar. Values are between 0 and 1.0 (so often you're going to want to divide the current value by the maximum value).

```ts
import { progressStart, progressUpdate } from "blowgun"

progressStart()
// ...
progressUpdate(0.5)
```

## `progressStop`

Stops the progress bar. You can pass in "fulfill" (default) to immediately draw the line at the final progress amount, "preserve" to keep the progress bar as-is, or "clear" to clear it away.

```ts
import { progressStart, progressUpdate, progressStop } from "blowgun"

progressStart()
// ...
progressUpdate(0.5)
// ...
progressUpdate(1)
progressStop()
```

## Testing

We currently don't have a recommended way to write tests for progress bars.
