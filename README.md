# @4lch4/busylight

This is a simple library to control a Busylight device from [Plenom][0], using their HTTP app.

## Requirements

In order for this to work, you have to have the official Busylight HTTP app installed and running on your computer. Here are the two ways I'm aware of to get it:

1. From [the Development Tools section of the download software page][2]. You have to request it though.
2. From the same download software page linked just above, but under the Premium Software you want to download the one for Twilio. The zip provided will include the HTTP app.

## Usage

```typescript
import { Busylight } from '@4lch4/busylight'

const busylight = new Busylight()
await busylight.on('green')
```

[0]: https://www.plenom.com
