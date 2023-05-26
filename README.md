# @4lch4/busylight

This is a simple library to control a Busylight device from [Plenom][0], using their HTTP app.

## Usage

```typescript
import { Busylight } from '@4lch4/busylight'

const busylight = new Busylight()
await busylight.on('green')
```

[0]: https://www.plenom.com
