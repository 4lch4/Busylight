import Axios, { AxiosInstance } from 'axios'
import colors from 'color-convert'
import { z } from 'zod'

//#region Zod Schemas
/** A Zod enum of available color names. */
export const ColorNames = z.enum([
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'rebeccapurple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
])

export const ActionNames = z.enum([
  'light',
  'alert',
  'jingle',
  'off',
  'pulse',
  'blink',
  'colorswithFlash',
])

export const InputValues = z.object({ action: ActionNames }).and(z.record(z.unknown()))

export const AlertInput = z.object({
  /** The name of the color to set the light to. */
  color: ColorNames.describe('The color to set the light to.'),

  /**
   * The sound to play when the alert is triggered. The following sounds are available:
   *
   * - `0`: No sound
   * - `1`: Fairy Tale
   * - `2`: Funky
   * - `3`: Kuando Train
   * - `4`: Open Office
   * - `5`: Quiet
   * - `6`: Telephone Nordic
   * - `7`: Telephone Original
   * - `8`: Telephone Pick Me Up
   */
  sound: z.number().min(0).max(8).default(3).optional(),

  /**
   * The volume to play the alert at.
   *
   * This value can be set to `0`, `25`, `50`, `75`, or `100`.
   */
  volume: z.number().min(0).max(100).default(75).optional(),
})
//#endregion Zod Schemas

export class Busylight {
  private client: AxiosInstance

  constructor(baseURL: string = 'http://localhost:8989') {
    this.client = Axios.create({ baseURL })
  }

  /**
   * Sends a request to the Busylight server with the provided parameters converted to a query
   * string before sending.
   *
   * @param params An object containing the parameters to convert to a query string.
   *
   * @returns The response from the Busylight server.
   */
  public async send(params: z.infer<typeof InputValues>) {
    params = InputValues.parse(params)

    return this.client.get('/', { params })
  }

  /**
   * Attempts to turn the Busylight on and set it to the provided color.
   *
   * @param color The color to set the light to.
   *
   * @returns The response from the Busylight server.
   */
  public async on(color: z.infer<typeof ColorNames>) {
    const rgb = colors.keyword.rgb(ColorNames.parse(color))

    return this.send({ action: 'light', red: rgb[0], green: rgb[1], blue: rgb[2] })
  }

  /**
   * Play an alert on the Busylight with the provided color, sound, and volume.
   *
   * @param input The color, sound, and volume to use for the alert.
   *
   * @returns The response from the Busylight server.
   */
  public async alert(input: z.infer<typeof AlertInput>) {
    input = AlertInput.parse(input)
    const rgb = colors.keyword.rgb(input.color)

    return this.send({
      action: 'alert',
      red: rgb[0],
      green: rgb[1],
      blue: rgb[2],
      sound: input.sound,
      volume: input.volume,
    })
  }

  /**
   * Blink the Busylight on and off with the provided color.
   *
   * @param color The color to blink the Busylight.
   *
   * @returns The response from the Busylight server.
   */
  public async blink(color: z.infer<typeof ColorNames>) {
    const rgb = colors.keyword.rgb(ColorNames.parse(color))

    return this.send({ action: 'blink', red: rgb[0], green: rgb[1], blue: rgb[2] })
  }

  /**
   * Play a jingle on the Busylight.
   *
   * @param input The color, sound, and volume to use for the jingle.
   *
   * @returns The response from the Busylight server.
   */
  public async jingle(input: z.infer<typeof AlertInput>) {
    input = AlertInput.parse(input)
    const rgb = colors.keyword.rgb(input.color)

    return this.send({
      action: 'jingle',
      red: rgb[0],
      green: rgb[1],
      blue: rgb[2],
      sound: input.sound,
      volume: input.volume,
    })
  }

  /**
   * Pulse a given color on the Busylight.
   *
   * @param color The color to pulse the Busylight.
   *
   * @returns The response from the Busylight server.
   */
  public async pulse(color: z.infer<typeof ColorNames>) {
    const rgb = colors.keyword.rgb(ColorNames.parse(color))

    return this.send({ action: 'pulse', red: rgb[0], green: rgb[1], blue: rgb[2] })
  }

  /**
   * Flash the Busylight between two colors.
   *
   * @param colorA The first color to flash.
   * @param colorB The second color to flash.
   *
   * @returns The response from the Busylight server.
   */
  public async flashColors(colorA: z.infer<typeof ColorNames>, colorB: z.infer<typeof ColorNames>) {
    const rgbA = colors.keyword.rgb(ColorNames.parse(colorA))
    const rgbB = colors.keyword.rgb(ColorNames.parse(colorB))

    return this.send({
      action: 'colorswithFlash',
      red: rgbA[0],
      green: rgbA[1],
      blue: rgbA[2],
      flashred: rgbB[0],
      flashgreen: rgbB[1],
      flashblue: rgbB[2],
    })
  }

  /**
   * Disable/turn off the Busylight.
   *
   * @returns The response from the Busylight server.
   */
  public async off() {
    return this.send({ action: 'off' })
  }
}
