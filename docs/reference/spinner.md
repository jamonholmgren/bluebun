# Spinner

Blowgun comes with a basic and extremely lightweight spinner capability, written in just a few lines of code.

## Usage

```typescript
import { spinStart, spinStop } from "blowgun"

spinStart("Doing something...")
// do something
spinStop("Done doing something!")
```

The `spinStop` function can take two arguments instead, if you want to provide your own "mark".

```typescript
spinStop("⚠️", "Failed to do something!",
```

_NOTE: Many CLIs use the venerable (and awesome) [Ora](https://github.com/sindresorhus/ora) module for spinners, but we wanted to keep Blowgun as lightweight as possible and have no dependencies. So, if you want a fancier spinner or have more options, you can always add Ora and use it instead. But this one is pretty good for the vast majority of use cases._

## Testing

We don't currently have a recommended way to test spinners.
