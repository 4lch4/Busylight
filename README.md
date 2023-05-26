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

await busylight.alert({ color: 'red', sound: 7, volume: 50 })

await busylight.blink('blue')

await busylight.jingle({ color: 'purple', sound: 3, volume: 100 })

await busylight.pulse('yellow')

await busylight.flashColors('red', 'blue')

await busylight.off()
```

## Further Reading

For more information, refer to [the manual][1] from Kuando on the HTTP app, it's where the API documentation resides.

[0]: https://www.plenom.com
[1]: https://www.plenom.com/wp-content/uploads/2020/01/kuandoHUB-Manual-0.9-Rev.0.9.19.pdf
[2]: https://www.plenom.com/downloads/download-software
